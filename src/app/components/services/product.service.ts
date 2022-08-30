import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { Observable,map, Subject } from 'rxjs'; //imported
import { HttpClient } from '@angular/common/http';//imported
import { CartItem } from '../models/CartItem';
import { async } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  cartItems: Product[] = [];

  cartProducts: Product[] = [];
    products: Product[] = [];
  product: Product = new Product;
  constructor(private _http: HttpClient) {
   

  }//  inject-Service

  getProducts(): Observable<Product[]> {
    return this._http.get<Product[]>("assets/data.json");
  } // get product from data.json
         
 
  public getProductById(id: number) {
    
    return this._http.get<Product[]>("assets/data.json")
      .pipe(
        map(products => products.filter(product => product.id === id))
      );
  }
  //public getProductById1(id: number): Product {
  //    this.getProducts().subscribe(
  //      response => {
  //        this.products = response;
  //        for (let i = 1; i <= this.products.length; i++) {
  //          if (this.products[i - 1].id === id) {
  //            this.product = this.products[i - 1];
  //          }
  //        }
  //        return this.product;
  //      },
  //      error => {
  //        alert('error');
  //      }
  ////    );
    
  //            return this.product;

  //}

  public isExist(product: Product) {
    var exists: boolean = false;

    for (let i=1 ; i <= this.cartItems.length; i++) {
      if (this.cartItems[i-1].id === product.id) {
        exists = true;
        return exists;
      }
    }
    return exists;
  }

  public productIndex(product: CartItem): number {

    for (let i = 0; i <= this.cartItems.length; i++) {
      if (this.cartItems[i].id === product.id) {
        console.log("founded "+ this.cartItems[i].name);
        return i;
      }
    }
    return -1;
  }


  updateProductAmount(i: number, product: Product) {
    this.cartItems[i].amount = product.amount;

  }

  addProductToCart(product: Product): void {
    console.log("to add" + product.name + product.id);

    if (this.isExist(product)===true) {
      let i: number = this.productIndex(product);
      this.updateProductAmount(i, product);
      console.log(this.cartItems);


    }
    else {
      this.cartItems.push(product);
      console.log(this.cartItems);

    }
  }
  getCartProduct(): Product[]{
    console.log(this.cartItems);
    return this.cartItems;
  }
   updateCartProducts(cartItem: Product): void {
     let i: number = this.productIndex(cartItem);
     this.cartItems[i].amount = cartItem.amount;
  }
  removeFromCart(product: Product) {
    
    const Index = this.productIndex(product);
    this.cartItems[Index].amount=0;
  
  }
  delete() {
    this.cartItems = [];
    return this.cartItems;
  }
}
