


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


export interface Users {
  id: number;
  Fname: string;
  Lname: string;
  email: string;
  password: string;
  role: Role;
  orders: Order[];
}

export enum Role {
  Admin = "Admin",
  User = "User",
}
export interface Order {
  id: number;
  "items": items[];
  "total": number;
}

export interface items {
  productId: string;
}