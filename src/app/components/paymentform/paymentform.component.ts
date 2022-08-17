import { Component, OnInit } from '@angular/core';
import { UtilsServices } from 'src/app/services/utilsServices';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-paymentform',
  templateUrl: '../../pages/PaymentForm/paymentform.component.html',
  styleUrls: ['./paymentform.component.scss'],
})
export class PaymentformComponent implements OnInit {

  contactForm = new FormGroup({
    firstName: new FormControl('d', [Validators.required]),
    lastName: new FormControl('f', [Validators.required]),
    email: new FormControl('ke@f', [Validators.required, Validators.email]),
    address: new FormControl('f', [Validators.required]),
  });

  constructor(private utilsService: UtilsServices, private navController: NavController) { }

  ngOnInit() { }

  onSubmit() {
    console.log(this.contactForm.value);
    this.utilsService.cleanShoppingCart();
    this.navController.navigateRoot('', {
      animated: true,
      animationDirection: 'back'
    });
  }

  get totalPrice() {
    return this.utilsService.computeFinalPrice();
  }
}
