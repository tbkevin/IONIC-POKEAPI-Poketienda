import { Injectable } from '@angular/core';
import { APIREST } from "./apiREST";
import { Categoria } from '.././classes/category/categoria';
import {ItemResult} from '../classes/product/productsCategory'
import {ProductSmall} from '../classes/product/product'
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
  })
  
export class DataManagment{

    constructor(private apirest:APIREST) { }

    getCategorias():Promise<Categoria[]>{
        return new Promise((resolve, reject)=>{
            this.apirest.getCategorias().subscribe(res =>{
                resolve(res.results);
              });    
        })
    }

    getProductsbyCategory(url:string):Promise<ItemResult[]>{
        return new Promise((resolve,reject)=>{
            this.apirest.getProductsbyCategory(url).subscribe(res =>{
                resolve(res.items);
            });
        });
    }

    getProductDetails(url:string):Promise<ProductSmall>{
        return new Promise((resolve,reject)=>{
            this.apirest.getProductDetails(url).subscribe(res =>{
                let cost = res.cost === 0? 100000:res.cost;
                let product = new ProductSmall(res.name,cost,res.sprites.default,res.id);
                resolve(product);
            });
        });
    }
}