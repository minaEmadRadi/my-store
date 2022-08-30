import { Component, OnInit,Output } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Product } from '../models/Product';
import { Validators , FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  fullName: string = '';
  address: string = '';
  creditCardNumber: string = '';
  totalAmount: number=0;
  value = '';
  cartItems: Product[] = [];
  cartItem: Product = new Product;
  formGroup: FormGroup;

  constructor(
     private _cartService: CartService,
     private formBuilder: FormBuilder,
      private router: Router) 
      {
    this.formGroup = this.formBuilder.group({
      'FullName': [null, Validators.required],
      'Adress': [null, Validators.required],
      'CardNumber': [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.cartItems = this._cartService.getCartProducts();
    console.log(this.cartItems);
    this.recalculateTotalAmount();
  }

  onSubmit(num:any) {  }
  SetValue(event:any) {  }
  onChangeForm(event: any) {  }


  recalculateTotalAmount(): void {
    this.totalAmount = 0;
    this._cartService.getCartProducts().forEach(
      CI => this.totalAmount += (CI.price * CI.amount));
  }

  changeItemAmount(cartItem: Product) {
    this.cartItem = cartItem;
    cartItem.amount = this.cartItem.amount;
    this._cartService.updateCartProducts(cartItem);
    this.recalculateTotalAmount();
    this.cartItems = this._cartService.getCartProducts();

  }
  delete() {
    this._cartService.delete();
    this.recalculateTotalAmount();
    this.cartItems = this._cartService.getCartProducts();

  }
  onChangeAmount(cartItem: Product, value: number) {
    this.cartItem = cartItem;
    cartItem.amount= value;
    this._cartService.addProductToCart(cartItem);
    this.recalculateTotalAmount();
  }
  async submitCartItems(): Promise<void> {
    this._cartService.delete();
      await this.router.navigate(['/cart/submit', { fullName: this.fullName, totalAmount: this.totalAmount }]);
    }
}
