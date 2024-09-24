import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { product, shopProduct } from '../models/product/product.module';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  shopProduct?: shopProduct
  // private apiUrl = "/api/products"
  private apiUrl = 'http://localhost:3000/products';

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
  addProduct(addProduct: product): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}`, addProduct);
  }
  deleteProduct(id: Number) {
    return this.httpClient.delete(`${this.apiUrl}/${id}`);
  }

  private cartUrl = 'http://localhost:3000/ShopCar';


  addToCart(item: product) {

    return this.httpClient.post<product>(this.cartUrl, item);
  }








}
