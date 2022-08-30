import { Component, OnInit ,Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../models/Product';
import { CartItem } from '../models/CartItem';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product = new Product;
  @Output() addToCartP: EventEmitter<Product> = new EventEmitter;


  @Input() amountSelected: number = 1;


  Options: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  
  constructor(private _productService: ProductService, private router: Router) {
}

  ngOnInit(): void {
    
  }
  add(product: Product) {
    product.amount =this.amountSelected ;
    this.addToCartP.emit(product);
  }
 
  onChange(value: number) {
    this.amountSelected = value;
  }
   ProductSelected(product: Product):void {
     this.router.navigate(['product/id', { product:product.id }]);
  }
   ProductSelectedDetails(product: Product):void {

     this.router.navigate(['product/id', { product: product.id }]);

  }
}

