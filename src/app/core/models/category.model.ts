export class CategoryModel {
  categoryId: number;
  categoryName: string;
  categoryDescription: string;
  categoryImage: string;
  sortOrder: number;
  isActive: boolean;
  createdDate: Date;

  constructor(
    categoryId: number = null,
    categoryName: string = '',
    categoryDescription: string = '',
    categoryImage: string = '',
    sortOrder: number = null,
    isActive: boolean = true, 
    createdDate: Date = new Date()
  ) {
    this.categoryId = categoryId;
    this.categoryName = categoryName;
    this.categoryDescription = categoryDescription;
    this.categoryImage = categoryImage;
    this.sortOrder = sortOrder;
    this.isActive = isActive;
    this.createdDate = createdDate;
  }
}

export class CategorgyAddEditCompModel {
  category: CategoryModel;
  focusField: string;
}

export class CategoryAddEditDeleteModel {
  categoryId: number;
  categoryName: string;
  categoryDescription: string;
  categoryImage: File;
  sortOrder: number;
  isActive: boolean;
  createdBy: string;
  createdDate: Date;
  modifiedBy: string;
  modifiedDate: Date;

  constructor(
    categoryId: number = null,
    categoryName: string = '',
    categoryDescription: string = '',
    categoryImage: File = null,
    sortOrder: number = 0,
    isActive: boolean = true, 
    createdBy: string = '',
    createdDate: Date = new Date(),
    modifiedBy: string = '',
    modifiedDate: Date = new Date()
  ) {
    this.categoryId = categoryId;
    this.categoryName = categoryName;
    this.categoryDescription = categoryDescription;
    this.categoryImage = categoryImage;
    this.sortOrder = sortOrder;
    this.isActive = isActive;
    this.createdBy = createdBy;
    this.createdDate = createdDate;
    this.modifiedBy = modifiedBy;
    this.modifiedDate = modifiedDate;
  }
}
