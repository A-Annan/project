import { Injectable } from '@angular/core';

@Injectable()
export class PrivilegeService {

  mod:Boolean=false;
  supp:Boolean=false;


  constructor() { }

  ngOnInit(){
    this.mod =false;
    this.supp =false;
    let re = /\"/gi;


    var prive = localStorage.getItem('privilege').replace(re,"");
    var priv =+prive;
    var rest;
    priv/= 10;

    if (priv%10 == 1){
      this.mod  = true;
    }
    priv = priv%10;
    if (priv%10 == 1){
      this.supp  = true;
    }
    console.log(this.supp);
    console.log(this.mod);

  }

  getModifierPrivilege(){
    return this.mod;
  }
  getSuppPrivilege(){
    return this.supp;
  }
}
