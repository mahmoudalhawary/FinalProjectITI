import { HttpClient } from '@angular/common/http';

 


export interface product {
  category: Category;
  _id: string;
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
}
export interface Category {
  id: number;
  name: Name;
 
}
 
export interface Category2 {
  name: Name;
}

export enum Name {
  Electronics = "Electronics",
  Furniture = "Furniture",
  Grosery = "Grosery",
  Kids = "Kids",
  Men = "Men",
  Miscellaneous = "Miscellaneous",
  Nuevo = "nuevo",
  Rrr = "Rrr",
  Shoes = "Shoes",
  TestingCategory = "Testing category ",
  Women = "Women",

}
