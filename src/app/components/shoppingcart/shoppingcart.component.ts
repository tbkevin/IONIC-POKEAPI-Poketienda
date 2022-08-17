import { Component, OnInit } from '@angular/core';
import { UtilsServices } from 'src/app/services/utilsServices';
import { CartProduct } from 'src/app/classes/product/product';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: '../../pages/ShoppingCart/shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {

  constructor(private utilsService: UtilsServices, private router: Router, private nav: NavController) { }

  ngOnInit() { }

  get shoppingCart() {
    return this.utilsService.cartShoppingProduct;
  }

  get totalPrice() {
    return this.utilsService.computeFinalPrice();
  }

  makePayment() {
    //this.nav.navigateRoot('/payment');
    //this.utilsService.cleanShoppingCart();
    this.nav.navigateForward('/payment');
  }

  deleteElement(element: CartProduct) {
    this.utilsService.deleteElement(element);
  }
}
