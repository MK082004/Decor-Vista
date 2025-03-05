import { DataSource } from '@angular/cdk/collections';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSort, Sort } from '@angular/material/sort';
import { BehaviorSubject, merge, throwError } from 'rxjs';
import { ApiService } from '../../services/api/api.service';
import { TableDataModel } from '../../models/auto-table-data-source.model';
import {
  DataInterface,
  FieldInterface,
  GridParamsInterface,
} from '../../interfaces/auto-table-data-source.interface';
import { APIType, FieldType } from '../../enums/auto-table-data-source.enum';
import { map } from 'rxjs/operators';
import { DialogService } from '../../services/dialog/dialog.service';

export class TableDataSource extends DataSource<any> {
  getRecords$: BehaviorSubject<DataInterface> = new BehaviorSubject({
    count: 0,
    data: [],
  });
  renderedData: any[] = [];
  data: any[] = [];
  itemCount: number = 0;
  isTblLoading = true;
  filterChange = new BehaviorSubject('');
  isFilterApplied: boolean = false;
  displayedColumns: string[] = [];
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  allRecords = [];

  constructor(
    public tableDataModel: TableDataModel,
    public apiService: ApiService
  ) {
    super();
  }

  getParamValueBasedOnType(fieldModel: FieldInterface) {
    switch (fieldModel.fieldType) {
      case 'number': {
        return Number(fieldModel.fieldValue);
        break;
      }
      case 'string': {
        return fieldModel.fieldValue;
        break;
      }
      case 'boolean': {
        return Boolean(fieldModel.fieldValue);
        break;
      }
      case 'date': {
        return new Date(fieldModel.fieldValue);
        break;
      }
    }
  }

  getData(skip?: number, take?: number): void {
    if (this.tableDataModel.hasDatasource) {
      this.getRecords$.next({
        count: this.tableDataModel.dataSource.length,
        data: this.tableDataModel.dataSource,
      });
    } else if (this.tableDataModel.apiType == APIType.POST) {
      let baseUrl = this.tableDataModel.apiUrl;
      let grigParams = <GridParamsInterface>{
        filter: this.tableDataModel.filter,
        primaryFilterParams: this.tableDataModel.primaryFilterParams,
        skip: skip,
        take: take,
        sort: null,
      };

      if (
        this.tableDataModel.sort?.active &&
        this.tableDataModel.sort?.direction != ''
      ) {
        grigParams.sort = <FieldInterface>{
          fieldName: this.tableDataModel.sort.active,
          fieldType: FieldType.UNKNOWN,
          fieldValue: this.tableDataModel.sort.direction,
        };
      }
        this.apiService.postRequest<DataInterface>(baseUrl, grigParams)
          .subscribe((result) => {
            this.isTblLoading = false;
            this.getRecords$.next({ count: result.count, data: result.data });
          }, (error: HttpErrorResponse) => {
            this.isTblLoading = false;
            return throwError(error);
          });
    } else if (this.tableDataModel.apiType == APIType.GET) {
      if (this.data.length === 0) {
        let baseUrl =
          this.tableDataModel.apiUrl + '?' + this.tableDataModel.queryParam;
          this.apiService.getRequest<any>(baseUrl).subscribe((result) => {
            this.isTblLoading = false;
            let dataResponse = [];
            if (!Array.isArray(result)) {
              dataResponse.push(result);
            } else {
              dataResponse = result;
            }
            this.getRecords$.next({
              count: dataResponse.length,
              data: dataResponse,
            });
          }, (error: HttpErrorResponse) => {
            this.isTblLoading = false;
            return throwError(error);
          });
      }
    }
  }

  onSortingChange(sort: Sort) {
    if (this.tableDataModel.isLazyLoad) {
      this.tableDataModel.sort = sort as MatSort;
      this.connect();
      return;
    }
    this.renderedData = this.sortData(this.renderedData);
    this.getRecords$.next({ count: this.itemCount, data: this.renderedData });
  }

  onFilterChange(filterValue: string) {
    this.isFilterApplied = true;
    if (filterValue === '') {
      this.isFilterApplied = false;
      this.connect();
      return;
    }
    var filteredData = Object.assign([{}], this.renderedData);
    filteredData = filteredData.slice().filter((record: any) => {
      const searchStr = this.getRecordFieldParams(
        this.displayedColumns,
        record
      ).toLowerCase();
      return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
    });
    this.getRecords$.next({
      count: this.renderedData.length,
      data: filteredData,
    });
  }

  getRecordFieldParams(displayedColumns: string[], record: any) {
    let filterParams: string = '';
    displayedColumns.forEach((element) => {
      filterParams = filterParams + record[this.convertFieldValue(element)];
    });
    return filterParams;
  }

  connect() {
    let displayDataChanges = [];
    if (this.tableDataModel?.sort?.sortChange) {
      displayDataChanges = [
        this.getRecords$,
        this.tableDataModel?.paginator?.page,
        this.tableDataModel?.sort?.sortChange,
        this.filterChange,
      ];
    } else {
      displayDataChanges = [
        this.getRecords$,
        this.tableDataModel?.paginator?.page,
        this.filterChange,
      ];
    }
    if (this.tableDataModel.isLazyLoad) {
      const skip =
        this.tableDataModel.paginator.pageIndex === 0
          ? 0
          : this.tableDataModel.paginator.pageSize *
            this.tableDataModel.paginator.pageIndex;
      this.getData(skip, this.tableDataModel.paginator.pageSize);
      return merge(...displayDataChanges).pipe(
        map(() => {
          this.getRecords$.subscribe((res) => {
            this.itemCount = res.count;
            this.data = res.data.slice();
            if (!this.isFilterApplied) {
              this.renderedData = this.data;
            }
          });
          if (!this.isFilterApplied) {
            return this.renderedData;
          }
          return this.data;
        })
      );
    } else {
      this.getData();
      return merge(...displayDataChanges).pipe(
        map(() => {
          const skip =
            this.tableDataModel.paginator.pageIndex === 0
              ? 0
              : this.tableDataModel.paginator.pageSize *
                this.tableDataModel.paginator.pageIndex;
          this.getRecords$.subscribe((res) => {
            this.data = res.data.slice(
              skip,
              skip === 0
                ? this.tableDataModel.paginator.pageSize
                : skip + this.tableDataModel.paginator.pageSize
            );
            this.itemCount = res.count;
          });
          return this.data;
        })
      );
    }
  }

  disconnect() {}

  sortData(data: any[]): any[] {
    if (
      !this.tableDataModel.sort.active ||
      this.tableDataModel.sort.direction === ''
    ) {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      let typeA =
        typeof a[this.convertFieldValue(this.tableDataModel.sort.active)];
      let typeB =
        typeof b[this.convertFieldValue(this.tableDataModel.sort.active)];
      if (typeA === 'number' && typeB === 'number') {
        [propertyA, propertyB] = [
          a[this.convertFieldValue(this.tableDataModel.sort.active)],
          b[this.convertFieldValue(this.tableDataModel.sort.active)],
        ];
      } else {
        [propertyA, propertyB] = [
          a[
            this.convertFieldValue(this.tableDataModel.sort.active)
          ].toLowerCase(),
          b[
            this.convertFieldValue(this.tableDataModel.sort.active)
          ].toLowerCase(),
        ];
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (
        (valueA < valueB ? -1 : 1) *
        (this.tableDataModel.sort.direction === 'asc' ? 1 : -1)
      );
    });
  }

  convertFieldValue(value: string) {
    return value.charAt(0).toLowerCase() + value.slice(1);
  }
}
