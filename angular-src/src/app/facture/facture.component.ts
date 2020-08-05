import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}




@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css']
})

export class FactureComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  reference:number;
  prix:number;
  designatio:string;
  quantite:string;
  element: PeriodicElement;

  ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'}
  ];
  
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','delete'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
  



  addProduct(){
    this.element = {position: this.reference, name: this.designatio, weight: this.prix, symbol: this.quantite};
    this.ELEMENT_DATA.push(this.element);
    this.dataSource.connect().next(this.ELEMENT_DATA);
    console.log(this.element);
    console.log(this.dataSource.data);
  }

}
