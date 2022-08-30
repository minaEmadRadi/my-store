import { Component, OnInit,Input, Output } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/Product';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  cartItem: Product = new Product;
  amountSelected: number =1;

  constructor(private _cartService: CartService,
    private _productService: ProductService) { }

  ngOnInit(): void {
    this._productService.getProducts().subscribe(
      response => {
        this.products = response;
      },
      error => {
        alert('error');
      }
    );
  }


  addToCartP(product: Product): void {
    this.cartItem = product;
    this._cartService.addProductToCart(this.cartItem);

    alert(product.name + " added");
  }
  
}
