import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { APIREST } from '../../services/apiREST';
import { Categoria } from '../../classes/category/categoria';
import { DataManagment } from "../../services/dataManagment";

//Borrar
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-category',
  templateUrl: '../../pages/Home/category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  @Output() categoriaSeleccionada = new EventEmitter<Categoria>();
  categories?: Categoria[];


  constructor(private apirest: APIREST, private dataManagment: DataManagment, private menu: MenuController) { }

  ngOnInit(): void {
    this.getCategorias();
    this.categoriaSeleccionada.subscribe(p => { });
  }

  async getCategorias() {
    this.categories = await this.dataManagment.getCategorias();
    this.categories = this.categories.filter(c => c.name !== "holdable-passive");
    this.categoriaSeleccionada.emit(this.categories[0]);

  }

  selectCategory(event: any) {
    let categorianombre = event.target.textContent.trim().toLowerCase();
    console.log(categorianombre);

    let category = this.categories?.find(c => c.name === categorianombre);
    this.menu.close('categories');
    this.categoriaSeleccionada.emit(category);
  }
}
