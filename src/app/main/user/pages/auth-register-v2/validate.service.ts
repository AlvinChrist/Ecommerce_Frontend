import { Injectable } from "@angular/core";
import { Validators } from "@angular/forms";
@Injectable({
  providedIn: 'root'
})
export class TestValidate {
  constructor(){}

  validasiEmailReq(): Validators {
    return Validators.compose([Validators.required, Validators.email])
  }
}