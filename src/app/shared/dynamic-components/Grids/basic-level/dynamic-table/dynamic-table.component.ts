import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { TableDataSource } from 'src/app/core/controls/auto-dataSource/table-data-source';
import { APIType } from 'src/app/core/enums/auto-table-data-source.enum';
import { DateFormater } from 'src/app/core/enums/dateFormatter.enum';
import { FieldInterface } from 'src/app/core/interfaces/auto-table-data-source.interface';
import { TableDataModel } from 'src/app/core/models/auto-table-data-source.model';
import { ApiService } from 'src/app/core/services/api/api.service';
@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.css'],
})
export class DynamicTableComponent implements OnInit, OnChanges {
  constructor(public apiService: ApiService) {}

  @Input() columns: DynamicTableColumnDefinition[] = [];
  @Input() filterOptions: FieldInterface[] = [];
  @Input() isApplySortingOnClient: boolean = true;
  @Input() isApplyFilterOnClient: boolean = true;
  @Input() apiUrl: string = "";
  @Input() apiType: APIType = APIType.POST;
  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();
  @Output() onActive = new EventEmitter<any>();
  // ********* Enum Define ********* //
  columnTypeDefine = DynamicTableColumnTypes;
  DATE_FORMAT = DateFormater.DAY_MONTH_YEAR_ABBR;
  DATE_TIME_FOMRAT = DateFormater.US_DATE_WITH_TIME;

  displayedColumns: string[] = [];
  matTableDataSourceDataModel = <TableDataModel>{};
  matTableDataSource: TableDataSource = new TableDataSource(this.matTableDataSourceDataModel, this.apiService);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit(): void {
    this.loadTableDataSource();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filterOptions'] && changes['filterOptions']['currentValue']) {
      this.fetchGridDataSource();
    }
  }

  private loadTableDataSource(): void {
    this.displayedColumns = this.columns.map((x) => x.columnKey);
    this.matTableDataSourceDataModel.apiType = this.apiType;
    this.matTableDataSourceDataModel.apiUrl = this.apiUrl;
    this.matTableDataSourceDataModel.isApplySortingOnClient = this.isApplySortingOnClient;
    this.matTableDataSourceDataModel.isApplyFilterOnClient = this.isApplyFilterOnClient;
    this.matTableDataSourceDataModel.paginator = this.paginator;
    this.matTableDataSourceDataModel.sort = this.sort;
    this.matTableDataSource = new TableDataSource(this.matTableDataSourceDataModel, this.apiService);
    this.matTableDataSource.displayedColumns = this.displayedColumns;
    this.matTableDataSourceDataModel.isLazyLoad = true;
  }

  public fetchGridDataSource(): void {
    this.matTableDataSourceDataModel.primaryFilterParams = this.filterOptions;
    this.matTableDataSource.connect();
  }  

  public onSortChangeHandler(sortState: Sort) {
    this.matTableDataSource.onSortingChange(sortState);
  }

  public pageChange(): void {
    const skip = this.paginator.pageSize * this.paginator.pageIndex;
    this.matTableDataSource.connect();
  }

  public handleEdit(row: any): void {
    this.onEdit.emit(row);
  }

  public handleDelete(row: any): void {
    this.onDelete.emit(row);
  }

  public handleActive(row: any): void {
    this.onActive.emit(row);
  }

  // New handlers for the new buttons
  public handleView(row: any): void {
    console.log('View:', row);
    // Logic for viewing the item
  }

  public handleArchive(row: any): void {
    console.log('Archive:', row);
    // Logic for archiving the item
  }

  public handleApprove(row: any): void {
    console.log('Approve:', row);
    // Logic for approving the item
  }
}

export class DynamicTableColumnDefinition {
  columnKey: string;
  columnLabel: string;
  columnType: DynamicTableColumnTypes;
  columnHeaderClass?: string;
  columnClass?: string;
  showActionButtons?: boolean = false;
  buttons?: string[] = [];
}

export enum DynamicTableColumnTypes {
  DATE = 'Date',
  DATETIME = 'DateTime',
  NUMBER = 'Number',
  STRING = 'String',
  BOOLEAN = 'Boolean',
  IMAGE = 'Image',
  ACTIONS = 'action'
}