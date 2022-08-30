import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/Product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit {
  product: Product = new Product;
  amountSelected: number = 1;
  id: number = 1;

  constructor(private _productService: ProductService, private route: ActivatedRoute) {
    this.id = Number(this.route.snapshot.paramMap.get('product'));

}
  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('product'));
    this._productService.getProductById(this.id)
      .subscribe(products => products.length !== 0 ? this.product = products[0] : undefined);
  }
  removeFromCartAction(product: Product) {
    this._productService.removeFromCart(product);
    alert(product.name + " deleted");

  }
  addToCartP(product: Product): void {
    this.amountSelected = product.amount;
    this._productService.addProductToCart(product);

    alert(product.name + " added");
  }
}
