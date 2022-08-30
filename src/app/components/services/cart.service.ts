import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { HttpClient } from '@angular/common/http';//imported
import { CartItem } from '../models/CartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: Product[] = [];
 
  constructor(private _http: HttpClient) {}//  inject-Service
  
  public isExist(product: Product) {
    var exists: boolean = false;

    for (let i=1 ; i <= this.cartItems.length; i++) {
      if (this.cartItems[i-1].id === product.id) {
        exists = true;
        return exists;
      }
    }
    return exists;
  }//check if exists

  public productIndex(product: CartItem): number {

    for (let i = 0; i <= this.cartItems.length; i++) {
      if (this.cartItems[i].id === product.id) {
        console.log("founded "+ this.cartItems[i].name);
        return i;
      }
    }
    return -1;
  }//get index


  updateProductAmount(i: number, product: Product) {
    this.cartItems[i].amount = product.amount;

  }//update Amount for cart items


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
  }//add item to cart

  getCartProducts(): Product[]{
    console.log(this.cartItems);
    return this.cartItems;
  }//get cart items

   updateCartProducts(cartItem: Product): void {
     let i: number = this.productIndex(cartItem);
     this.cartItems[i].amount = cartItem.amount;
  }//update Amount for cart items

  removeFromCart(product: Product) {
    
    const Index = this.productIndex(product);
    this.cartItems[Index].amount=0;
  
  }//Rmove Product From Cart

  delete() {
    this.cartItems = [];
    return this.cartItems;
  }//Clear Cart Items
}
