import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: '../../pages/header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(private navController: NavController) { }

  ngOnInit() { }
  goHome() {
    this.navController.navigateForward("/home");
  }

  goShoppingCart() {
    this.navController.navigateForward("/shopping-cart");
  }
}
