import { product, shopProduct } from './../models/product/product.module';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
  import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  product?: product  ;

  constructor(private httpClient: HttpClient) { }



  private cartUrl = 'http://localhost:3000/ShopCar';
  getItems(): Observable<product[]> {
    return this.httpClient.get<product[]>(this.cartUrl);

  }

  delete(item: product) {
    return this.httpClient.delete(`${this.cartUrl}/${item.id}`);
  }

}
