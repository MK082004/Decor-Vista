export class CategoryModel {
  categoryId: number;
  categoryName: string;
  categoryDescription: string;
  categoryImage: string;
  sortOrder: number;

  constructor(
    categoryId: number = null,
    categoryName: string = '',
    categoryDescription: string = '',
    categoryImage: string = '',
    sortOrder: number = null
  ) {
    this.categoryId = categoryId;
    this.categoryName = categoryName;
    this.categoryDescription = categoryDescription;
    this.categoryImage = categoryImage;
    this.sortOrder = sortOrder;
  }
}

export class CategoryApiModel {
  categories: CategoryModel[] = [];
  count: number;
}
