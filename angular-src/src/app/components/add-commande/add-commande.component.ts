import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {CommandeService} from "../../commande.service";
import {typecommade} from "../../show-cmd/show-cmd.component";
import {MatTableDataSource} from "@angular/material";


interface City {
  name: string;
}


export interface TeleTrack{
  Tele:String;
  tracking:String;
}


@Component({
  selector: 'app-add-commande',
  templateUrl: './add-commande.component.html',
  styleUrls: ['./add-commande.component.css']
})
export class AddCommandeComponent implements OnInit {

  nom: String;
  tele: String;
  ville: String;
  adr: String;
  produit: String;
  quantite: String;
  prix: String;
  statut: String;
  note: String;
  date: String;
  user: String;
  tracking: String;

  data:Array<TeleTrack>;

  cities: City[];

  constructor(
    private router: Router,
    private authService: AuthService,
    private commandeService:CommandeService
  ) {

    this.cities = [
      {name: 'New'},
      {name: 'RP1'},
      {name: 'BV1' },
      {name: 'NUL1' },
      {name: 'TILL1' },
      {name: 'Ordered' },
      {name: 'RP2' },
      {name: 'BV2' },
      {name: 'NUL2' },
      {name: 'TILL2'},
      {name: 'Confirmed' },
      {name: 'Shipped' },
      {name: 'Returned' },
      {name: 'Delivred' }
    ];
  }



  ngOnInit() {

    this.trackExist = false;
    this.teleExist = false;

    this.commandeService.getCommandetrackUser().subscribe((data:any)=>{
      if (!data.success) {

      } else {
        this.data = data.data;
      }
    })
  }
teleExist:Boolean = false;
trackExist:Boolean = false;



  addCmd(){


    this.trackExist = false;
    this.teleExist = false;
    let re = /\"/gi;
    const commande = {
      Nom: (this.nom==null)?' ':this.nom,
    Tele: (this.tele==null)?' ':this.tele,
    Ville: (this.ville==null)?' ':this.ville,
      Adresse: (this.adr==null)?' ':this.adr,
    Produit: (this.produit==null)?' ':this.produit,
    Quantite: (this.quantite==null)?' ':this.quantite,
    Prix: (this.prix==null)?' ':this.prix,
    Statut: (this.statut==null)?' ':this.statut,
    Note: (this.note==null)?' ':this.note,
      user: localStorage.getItem('username').replace(re,""),
      tracking: (this.tracking==null)?' ':this.tracking
    };


this.data.forEach(row =>{
  if (row.tracking == this.tracking) this.trackExist = true;
  if (row.Tele == this.tele) this.teleExist = true;
});

    if (!this.teleExist && !this.trackExist){
      this.commandeService.addCommande(commande).subscribe((data:any) =>{
        if (!data.success) {
        } else {
          this.router.navigate(['/showCmd']);


        }

      })
    }


  }

}
