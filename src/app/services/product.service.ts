import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { product } from '../models/product/product.module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // private apiUrl = "/api/products"
  private apiUrl = 'http://localhost:3000/products';

  // private apiUrl = 'https://react-shop-backend.liara.run/products';
  constructor(private httpClient: HttpClient) { }
  getAllProducts(): Observable<product[]> {

    return this.httpClient.get<product[]>(this.apiUrl);
  }


  getProductById(id: Number): Observable<product> {
    return this.httpClient.get<product>(`${this.apiUrl}/${id}`);
  }

  updateProduct(id: Number, updatedProduct: product): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/${id}`, updatedProduct);
  }

  private cartUrl = 'http://localhost:3000/ShopCar';  // URL to your JSON server for the cart


  addToCart(item: product): Observable<product> {
    return this.httpClient.post<product>(this.cartUrl, item);
  }






}
