import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CategoryComponent } from './components/category/category.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreComponent } from './components/store/store.component';
import { ShoppingCartComponent } from './components/shoppingcart/shoppingcart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentformComponent } from './components/paymentform/paymentform.component';

@NgModule({
  declarations: [AppComponent, CategoryComponent, HeaderComponent, StoreComponent, ShoppingCartComponent, PaymentformComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, ReactiveFormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
