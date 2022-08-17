import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PaymentformComponent } from './components/paymentform/paymentform.component';
import { ShoppingCartComponent } from './components/shoppingcart/shoppingcart.component';
import { StoreComponent } from './components/store/store.component';

const routes: Routes = [
  {
    path: 'home',
    component: StoreComponent
  },
  {
    path: 'shopping-cart',
    component: ShoppingCartComponent
  },
  { path: 'payment', pathMatch: 'full', component: PaymentformComponent },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'category',
    loadChildren: () => import('./pages/category/category.module').then( m => m.CategoryPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
