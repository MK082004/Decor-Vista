import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { APIType } from "../enums/auto-table-data-source.enum";
import { FieldInterface, InitColumnsInterface } from "../interfaces/auto-table-data-source.interface";

export class TableDataModel {
  paginator?: MatPaginator;
  isApplySortingOnClient?: boolean;
  isApplyFilterOnClient?: boolean;
  sort?: MatSort;
  filter?: FieldInterface;
  apiUrl: string;
  apiType: APIType;
  primaryFilterParams?: FieldInterface[];
  queryParam?: string;
  isLazyLoad: boolean;
  hasDatasource?: boolean;
  dataSource?: any[];
}

export class CustomGridModel extends TableDataModel {
  initGrid: boolean;
  updateGrid?: boolean;
  returnData?: boolean;
  deleteRow?: any;
  initColumns: InitColumnsInterface[];
}
