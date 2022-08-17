import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Categoria } from 'src/app/classes/category/categoria';
import { DataManagment } from 'src/app/services/dataManagment';
import { ItemResult } from "src/app/classes/product/productsCategory";
import { ProductSmall, CartProduct } from 'src/app/classes/product/product';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsServices } from 'src/app/services/utilsServices';
import { IonInfiniteScroll, IonInput } from '@ionic/angular';

@Component({
  selector: 'app-store',
  templateUrl: '../../pages/Home/store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {
  offset: number = 0;
  limit: number = 30;
  category: Categoria = { name: "", url: "" };
  products: ProductSmall[] = [];
  pageIndex: number = 0;
  initialized = false;
  searchBy: string = '';
  noFounded = false;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  constructor(private dataManagment: DataManagment, private activatedRoute: ActivatedRoute,
    private router: Router, private utilsService: UtilsServices) { }

  ngOnInit() {
    console.log("inicio");

  }


  public selectedCategory(categoria: Categoria): void {
    this.infiniteScroll.disabled = true;
    if (this.utilsService.thereWasLastCategory) {
      this.category = this.utilsService.lastSelectedCategory;
    } else {
      this.category = Object.assign({}, categoria);
    }
    this.getProductsurls();
  }

  private async getProductsurls() {
    let itemResults = await this.dataManagment.getProductsbyCategory(this.category.url);
    this.products = [];
    this.searchBy = '';
    this.displayProducts(itemResults);
  }

  private async displayProducts(itemResults: ItemResult[]) {

    let listproducts: ProductSmall[] = [];
    for (const ir of itemResults) {

      listproducts.push(await this.dataManagment.getProductDetails(ir.url))
    }
    this.utilsService.productsStore = listproducts;
    this.offset = 0;
    this.products = this.utilsService.productsStore.slice(this.offset, this.limit);
    this.initialized = true;
    this.utilsService.thereWasLastCategory = false;
    this.infiniteScroll.disabled = false;
    this.noFounded = false;
    //this.random();
  }

  private random() {
    this.products.sort(function () {
      return Math.random() - 0.5;
    });
  }

  public addCart(product: ProductSmall, amount: IonInput): void {
    const value = amount.value;
    if (value === "" || Number(value) < 1) {
      amount.value = "1";
      return;
    }
    const cartProduct = new CartProduct(product, Number(value));
    this.utilsService.addProductToShoppingCart(cartProduct);
  }

  loadMoreProducts(event) {
    console.log("cargando");

    this.offset = this.offset + this.limit;
    if (this.offset > this.utilsService.productsStore.length) {
      this.offset = 0;
      event.target.disabled = true;
      return;
    }
    setTimeout(() => {
      const newProducts = this.utilsService.productsStore.slice(this.offset, this.offset + this.limit);
      this.products = [...this.products, ...newProducts];
      event.target.complete();
    }, 500);
  }

  onSearch(event: any) {
    console.log("ee");

    this.noFounded = false
    const value = event.detail.value;
    this.infiniteScroll.disabled = true;
    if (event.detail.value === "") {
      this.products = this.utilsService.productsStore.slice(0, this.limit);
      this.infiniteScroll.disabled = false;
      return;
    }
    const searchProducts = this.utilsService.productsStore.filter(product => product.name.includes(event.detail.value));
    if (searchProducts.length === 0) {
      this.products = this.utilsService.productsStore.slice(0, this.limit);
      this.noFounded = true;
      this.infiniteScroll.disabled = false;
    } else {
      this.products = this.utilsService.productsStore.filter(product => product.name.includes(event.detail.value));
    }
  }
}
