export class Product {
  id: number;
  title: string;
  description: string;
  sku: string;
  author: string;
  listPrice: number;
  price: number;
  price50: number;
  price100: number;
  categoryId: number;
  category: Category;
  imageUrl: string;

  constructor(
    id: number = null,
    title: string = '',
    description: string = '',
    sku: string = '',
    author: string = '',
    listPrice: number = null,
    price: number = null,
    price50: number = null,
    price100: number = null,
    categoryId: number = null,
    category: Category = new Category(),
    imageUrl: string = ''
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.sku = sku;
    this.author = author;
    this.listPrice = listPrice;
    this.price = price;
    this.price50 = price50;
    this.price100 = price100;
    this.categoryId = categoryId;
    this.category = category;
    this.imageUrl = imageUrl;
  }
}

export class ProductsApiModel {
  products: Product[] = [];
  count: number;
}

export class Category {
  id: number;
  name: string;
  displayOrder: number;

  constructor(id: number = null, name: string = '', displayOrder: number = 0) {
    this.id = id;
    this.name = name;
    this.displayOrder = displayOrder;
  }
}


export class CategoryApiModel {
  categories: Category[] = [];
  count: number;
}
