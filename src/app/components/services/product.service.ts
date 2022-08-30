import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { Observable,map, Subject } from 'rxjs'; //imported
import { HttpClient } from '@angular/common/http';//imported

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  products: Product[] = [];
  product: Product = new Product;
  constructor(private _http: HttpClient) {}//  inject-Service

  getProducts(): Observable<Product[]> {
    return this._http.get<Product[]>("assets/data.json");
  } // get products from data.json
         
 
  public getProductById(id: number) {
    return this._http.get<Product[]>("assets/data.json")
      .pipe(
        map(products => products.filter(product => product.id === id))
      );
  }//get productDetails from data.json

}
