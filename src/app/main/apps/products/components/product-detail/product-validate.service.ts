import { Injectable } from "@angular/core";
import { Product } from "../../model/product.viewmodel";

@Injectable({
  providedIn: 'root'
})
export class ProductValidate {
  constructor(){}

  validasiAkhir(data: Product): Object {
    const ref = new Product();
    let status = false;
    (Object.keys(ref)).forEach((key) => {
      status = typeof(data[key]) === typeof(ref[key])
    })
    let res = {
      status: status,
      message: ""
    }
    if(!status) res.message = "Data tidak sama dengan viewmodel!"
    return res
  }
}