import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductItemDetailComponent } from './components/product-item-detail/product-item-detail.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'productList', component: ProductListComponent },
  { path: 'cart', component: CartComponent },
  { path: 'product/id', component: ProductItemDetailComponent, data: { title: 'Product' } },
  { path: 'Confirmation', component: ConfirmationComponent },
  { path: 'cart/submit', component: ConfirmationComponent, data: { title: 'Order Confirmation' } },
  { path: '**', redirectTo: 'productList' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
