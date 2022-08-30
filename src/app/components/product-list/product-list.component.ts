import { Component, OnInit,Input, Output } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/Product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  cartItem: Product = new Product;
  amountSelected: number =1;
  constructor(private _productService: ProductService) { }

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
  //setAmount(num: number) {
  //  this.amountSelected = num;
  //}

  addToCartP(product: Product): void {
    this.cartItem = product;
    this._productService.addProductToCart(this.cartItem);

    alert(product.name + " added");
  }
  
}
