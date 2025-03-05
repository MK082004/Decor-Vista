import { FieldType } from "../enums/auto-table-data-source.enum";

export interface FieldInterface {
  fieldName: string;
  fieldValue: string;
  fieldType: FieldType
}

export interface DataInterface {
  count: number;
  data: any[]
}

export interface InitColumnsInterface {
  key: string;
  value: Array<any>;
  label: string;
  type: string;
  colorValue?: Array<any>;
  customnOptionValue?: Array<any>;
  isLinked?: boolean;
  dependFieldBool?: string;
  clickable?: boolean;
  applyCss?: string;
}

export interface GridParamsInterface {
  sort: FieldInterface;
  filter: FieldInterface;
  skip: number;
  take: number;
  primaryFilterParams: FieldInterface[]

}
