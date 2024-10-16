import { CategoryModel } from "./category.model";

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
  category: CategoryModel;
  imageUrl: string[];

  constructor(
    id: number = 0,
    title: string = '',
    description: string = '',
    sku: string = '',
    author: string = '',
    listPrice: number = 0,
    price: number = 0,
    price50: number = 0,
    price100: number = 0,
    categoryId: number = 0,
    category: CategoryModel = new CategoryModel(),
    imageUrl: string[] = []
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
