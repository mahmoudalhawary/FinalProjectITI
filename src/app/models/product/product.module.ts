


export interface product {
  userID: number;
  category: Category;
  _id: string;
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
}
export interface product2 {
  userID: number;
  category: Category;
  _id: string;
  id: string;
  title: string;
  price: number;
  description: string;
  images: string[];
}
export interface shopProduct {
  userID: number;
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
  name: string;

}
export interface Category2 {
  id: string;
  name: string;

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