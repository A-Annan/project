import { Injectable } from '@angular/core';

@Injectable()
export class StatusService {

  constructor() { }


  status:String;
  clicked:Boolean=false;


  getType(){
    if (this.clicked) return 'text';
   else return 'number';
  }
}
