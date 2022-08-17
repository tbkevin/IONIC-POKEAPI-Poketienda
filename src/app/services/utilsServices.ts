import { Injectable } from '@angular/core';
import { ProductSmall, CartProduct } from '../classes/product/product'
import { Router } from '@angular/router';
import { Categoria } from '../classes/category/categoria';
import { NavController } from '@ionic/angular';
@Injectable({
    providedIn: 'root'
})
export class UtilsServices {
    //Variables for shopping cart
    productsStore: ProductSmall[] = [];

    cartShoppingProduct: CartProduct[] = [];

    //Variables for store
    lastSelectedCategory!: Categoria;
    thereWasLastCategory: boolean = false;
    changeFromPaginator: boolean = false;
    categories: Categoria[] = [];

    constructor(private router: Router, private nav: NavController) {
    }


    public addProductToShoppingCart(product: CartProduct) {
        if (this.cartShoppingProduct.length === 0) {
            this.cartShoppingProduct.push(product);
        } else {
            let sameProduct = this.cartShoppingProduct.find(p => { return p.product.name === product.product.name });
            if (sameProduct === undefined) {
                this.cartShoppingProduct.push(product);
            } else {
                sameProduct.amount += product.amount;
            }
        }
        this.nav.navigateForward('/shopping-cart');
        // this.nav.navigateRoot('/shopping-cart');
    }

    public computeFinalPrice(): number {
        let acum: number = 0;
        this.cartShoppingProduct.forEach(cp => {
            acum += cp.amount * cp.product.cost
        });
        return acum;
    }

    public cleanShoppingCart(): void {
        this.cartShoppingProduct = [];
    }

    public deleteElement(element: CartProduct): void {
        const indexOfElement = this.cartShoppingProduct.findIndex(ct => {
            return element.product.name.toLocaleLowerCase() === ct.product.name.toLocaleLowerCase();
        });
        this.cartShoppingProduct.splice(indexOfElement, 1);

    }

}