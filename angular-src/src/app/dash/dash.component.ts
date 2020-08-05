import {Component, Inject, OnInit} from '@angular/core';
import {CommandeService} from "../commande.service";
import {StatusService} from "../status.service";
import {Router} from "@angular/router";
import {SearchServiceService} from "../searchCmd.service";
import {ShowCmdComponent} from "../show-cmd/show-cmd.component";

declare var $:any;


class test {

  id: Number;
  Nom :String;
  Tele: String;
  Adresse: String;
  Ville : String;
  Prenom : String;
  Email:String;
  Username:String;
  type:String;
}


@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {

  value: number = 50;

  somme: number=0;
  NEW: number=0;
  NEW_moyen :number=0;

  users: Array<test>;


  RP1: number=0;
  RP1m: number=0;

  BV1: number=0;
  BV1m: number=0;

  NUL1: number=0;
  NUL1m: number=0;

  TILL1: number=0;
  TILL1m: number=0;

  Ordered: number=0;
  Orderedm: number=0;

  RP2: number=0;
  RP2m: number=0;

  BV2: number=0;
  BV2m: number=0;

  NUL2: number=0;
  NUL2m: number=0;

  TILL2: number=0;
  TILL2m: number=0;

  Confirmed: number=0;
  Confirmedm: number=0;

  Shipped: number=0;
  Shippedm: number=0;

  Returned: number=0;
  Returnedm: number=0;

  Delivred: number=0;
  Delivredm: number=0;

  userChoisit:String = null;

  testData: any;
  date: Date[];
  es: any;

  constructor(
    private searchService:SearchServiceService,
    private router:Router,
    private statusService:StatusService,
    private commandeService: CommandeService
  ) {
    this.testData = {
      labels: ['Janvier'],
      datasets: [
        {
          label: 'Confirmed',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: [65]
        },
        {
          label: 'Ordred',
          backgroundColor: '#9CCC65',
          borderColor: '#7CB342',
          data: [28]
        },
        {
          label: 'Delivred',
          backgroundColor: '#ff8c00',
          borderColor: '#ffa500',
          data: [65]
        },
        {
          label: 'Returned',
          backgroundColor: '#fcb5a6',
          borderColor: '#fcb5a6',
          data: [28]
        },
        {
          label: 'Shipped',
          backgroundColor: '#AC3442',
          borderColor: '#AC3442',
          data: [28]
        },
        {
          label: 'RP2',
          backgroundColor: '#521f22',
          borderColor: '#521f22',
          data: [28]
        },
        {
          label: 'BV2',
          backgroundColor: '#FFD921',
          borderColor: '#F0E68C',
          data: [28]
        },
        {
          label: 'NUL2',
          backgroundColor: '#FFA7A0',
          borderColor: '#F0E68C',
          data: [28]
        },
        {
          label: 'TILL2',
          backgroundColor: '#FBD70B',
          borderColor: '#F0E68C',
          data: [28]
        },
        {
          label: 'NUL1',
          backgroundColor: '#BBD700',
          borderColor: '#F0E68C',
          data: [28]
        },
        {
          label: 'TILL1',
          backgroundColor: '#CCD700',
          borderColor: '#F0E68C',
          data: [28]
        },
        {
          label: 'BV1',
          backgroundColor: '#FFD402',
          borderColor: '#F0E68C',
          data: [28]
        },
        {
          label: 'RP1',
          backgroundColor: '#AAB700',
          borderColor: '#AAB700',
          data: [28]
        },
        {
          label: 'NEW',
          backgroundColor: '#FFD799',
          borderColor: '#FFD799',
          data: [28]
        },

      ]
    }
  }

/*

        {
          label: 'Ordred',
          backgroundColor: '#2c3e50',
          borderColor: '#2c3e50',
          data:[65, 59, 80, 81, 56, 55, 40,100]
        },
        {
          label: 'Delivred',
          backgroundColor: '#e74c3c',
          borderColor: '#e74c3c',
          data: [28, 48, 40, 19, 86, 27, 90,100]
        },
        {
          label: 'Returned',
          backgroundColor: '#bdc3c7',
          borderColor: '#bdc3c7',
          data: [65, 59, 80, 81, 56, 55, 40,100]
        }
        */



  userFunction(user){
    this.somme = 0;
    this.NEW=0;
    this.NEW_moyen=0;

    this.RP1=0;
    this.RP1m=0;

    this.BV1=0;
    this.BV1m=0;

    this.NUL1=0;
    this.NUL1m=0;

    this.TILL1=0;
    this.TILL1m=0;

    this.Ordered=0;
    this.Orderedm=0;

    this.RP2=0;
    this.RP2m=0;

    this.BV2=0;
    this.BV2m=0;

    this.NUL2=0;
    this.NUL2m=0;

    this.TILL2=0;
    this.TILL2m=0;

    this.Confirmed=0;
    this.Confirmedm=0;

    this.Shipped=0;
    this.Shippedm=0;

    this.Returned=0;
    this.Returnedm=0;

    this.Delivred=0;
    this.Delivredm=0;
      this.userChoisit = user;


      if (!this.date) {

        if (user == 'all'){
          this.commandeService.getData().subscribe((data:any) =>{

            if (!data.success) {
              console.log('prob au niveau show-cmd.ts');
            } else{

              for (let cmd of data.cmd){
                switch (cmd.Statut){

                  case "New":{
                    this.NEW = cmd.nombre;
                    this.somme += cmd.nombre;
                    break;
                  }
                  case "RP1":{
                    this.RP1 = cmd.nombre;
                    this.somme += cmd.nombre;
                    break;
                  }
                  case "BV1":{
                    this.BV1 = cmd.nombre;
                    this.somme += cmd.nombre;
                    break;
                  }
                  case "NUL1":{
                    this.NUL1 = cmd.nombre;
                    this.somme += cmd.nombre;
                    break;
                  }
                  case "TILL1":{
                    this.TILL1 = cmd.nombre;
                    this.somme += cmd.nombre;
                    break;
                  }
                  case "Ordered":{
                    this.Ordered = cmd.nombre;
                    this.somme += cmd.nombre;
                    break;
                  }
                  case "RP2":{
                    this.RP2 = cmd.nombre;
                    this.somme += cmd.nombre;
                    break;
                  }
                  case "BV2":{
                    this.BV2 = cmd.nombre;
                    this.somme += cmd.nombre;
                    break;
                  }
                  case "NUL2":{
                    this.NUL2 = cmd.nombre;
                    this.somme += cmd.nombre;
                    break;
                  }
                  case "TILL2":{
                    this.TILL2 = cmd.nombre;
                    this.somme += cmd.nombre;
                    break;
                  }
                  case "Confirmed":{
                    this.Confirmed = cmd.nombre;
                    this.somme += cmd.nombre;
                    break;
                  }
                  case "Shipped":{
                    this.Shipped = cmd.nombre;
                    this.somme += cmd.nombre;
                    break;
                  }
                  case "Returned":{
                    this.Returned = cmd.nombre;
                    this.somme += cmd.nombre;
                    break;
                  }
                  case "Delivred":{
                    this.Delivred = cmd.nombre;
                    this.somme += cmd.nombre;
                    break;
                  }

                }
              }

              if (this.somme !=0){
                this.NEW_moyen =  (this.NEW*100)/ this.somme;
                this.NEW_moyen = parseFloat(this.NEW_moyen.toFixed(2));

                this.RP1m =  (this.RP1*100)/ this.somme;
                this.RP1m = parseFloat(this.RP1m.toFixed(2));

                this.BV1m =  (this.BV1*100)/ this.somme;
                this.BV1m = parseFloat(this.BV1m.toFixed(2));

                this.NUL1m =  (this.NUL1*100)/ this.somme;
                this.NUL1m = parseFloat(this.NUL1m.toFixed(2));

                this.TILL1m =  (this.TILL1*100)/ this.somme;
                this.TILL1m = parseFloat(this.TILL1m.toFixed(2));

                this.Orderedm =  (this.Ordered*100)/ this.somme;
                this.Orderedm = parseFloat(this.Orderedm.toFixed(2));

                this.RP2m =  (this.RP2*100)/ this.somme;
                this.RP2m = parseFloat(this.RP2m.toFixed(2));

                this.BV2m =  (this.BV2*100)/ this.somme;
                this.BV2m = parseFloat(this.BV2m.toFixed(2));

                this.NUL2m =  (this.NUL2*100)/ this.somme;
                this.NUL2m = parseFloat(this.NUL2m.toFixed(2));

                this.TILL2m =  (this.TILL2*100)/ this.somme;
                this.TILL2m = parseFloat(this.TILL2m.toFixed(2));

                this.Confirmedm =  (this.Confirmed*100)/ this.somme;
                this.Confirmedm = parseFloat(this.Confirmedm.toFixed(2));

                this.Shippedm =  (this.Shipped*100)/ this.somme;
                this.Shippedm = parseFloat(this.Shippedm.toFixed(2));

                this.Returnedm =  (this.Returned*100)/ this.somme;
                this.Returnedm = parseFloat(this.Returnedm.toFixed(2));

                this.Delivredm =  (this.Delivred*100)/ this.somme;
                this.Delivredm = parseFloat(this.Delivredm.toFixed(2));
              }



            }




          },err =>{
            console.log(err);
            return false;
          })
          this.userChoisit = null;
        }
        else {
          this.commandeService.getDashUser(user).subscribe((data:any) =>{
            if (!data.success) {
              console.log('prob au niveua du dash partie date');
            } else{

              for (let cmd of data.commande){
                switch (cmd.Statut){

                  case "New":{
                    this.NEW = cmd.nombre;
                    this.somme += cmd.nombre;
                    break;
                  }
                  case "RP1":{
                    this.RP1 = cmd.nombre;
                    this.somme += cmd.nombre;
                    break;
                  }
                  case "BV1":{
                    this.BV1 = cmd.nombre;
                    this.somme += cmd.nombre;
                    break;
                  }
                  case "NUL1":{
                    this.NUL1 = cmd.nombre;
                    this.somme += cmd.nombre;
                    break;
                  }
                  case "TILL1":{
                    this.TILL1 = cmd.nombre;
                    this.somme += cmd.nombre;
                    break;
                  }
                  case "Ordered":{
                    this.Ordered = cmd.nombre;
                    this.somme += cmd.nombre;
                    break;
                  }
                  case "RP2":{
                    this.RP2 = cmd.nombre;
                    this.somme += cmd.nombre;
                    break;
                  }
                  case "BV2":{
                    this.BV2 = cmd.nombre;
                    this.somme += cmd.nombre;
                    break;
                  }
                  case "NUL2":{
                    this.NUL2 = cmd.nombre;
                    this.somme += cmd.nombre;
                    break;
                  }
                  case "TILL2":{
                    this.TILL2 = cmd.nombre;
                    this.somme += cmd.nombre;
                    break;
                  }
                  case "Confirmed":{
                    this.Confirmed = cmd.nombre;
                    this.somme += cmd.nombre;
                    break;
                  }
                  case "Shipped":{
                    this.Shipped = cmd.nombre;
                    this.somme += cmd.nombre;
                    break;
                  }
                  case "Returned":{
                    this.Returned = cmd.nombre;
                    this.somme += cmd.nombre;
                    break;
                  }
                  case "Delivred":{
                    this.Delivred = cmd.nombre;
                    this.somme += cmd.nombre;
                    break;
                  }

                }
              }

              if (this.somme !=0){
                this.NEW_moyen =  (this.NEW*100)/ this.somme;
                this.NEW_moyen = parseFloat(this.NEW_moyen.toFixed(2));

                this.RP1m =  (this.RP1*100)/ this.somme;
                this.RP1m = parseFloat(this.RP1m.toFixed(2));

                this.BV1m =  (this.BV1*100)/ this.somme;
                this.BV1m = parseFloat(this.BV1m.toFixed(2));

                this.NUL1m =  (this.NUL1*100)/ this.somme;
                this.NUL1m = parseFloat(this.NUL1m.toFixed(2));

                this.TILL1m =  (this.TILL1*100)/ this.somme;
                this.TILL1m = parseFloat(this.TILL1m.toFixed(2));

                this.Orderedm =  (this.Ordered*100)/ this.somme;
                this.Orderedm = parseFloat(this.Orderedm.toFixed(2));

                this.RP2m =  (this.RP2*100)/ this.somme;
                this.RP2m = parseFloat(this.RP2m.toFixed(2));

                this.BV2m =  (this.BV2*100)/ this.somme;
                this.BV2m = parseFloat(this.BV2m.toFixed(2));

                this.NUL2m =  (this.NUL2*100)/ this.somme;
                this.NUL2m = parseFloat(this.NUL2m.toFixed(2));

                this.TILL2m =  (this.TILL2*100)/ this.somme;
                this.TILL2m = parseFloat(this.TILL2m.toFixed(2));

                this.Confirmedm =  (this.Confirmed*100)/ this.somme;
                this.Confirmedm = parseFloat(this.Confirmedm.toFixed(2));

                this.Shippedm =  (this.Shipped*100)/ this.somme;
                this.Shippedm = parseFloat(this.Shippedm.toFixed(2));

                this.Returnedm =  (this.Returned*100)/ this.somme;
                this.Returnedm = parseFloat(this.Returnedm.toFixed(2));

                this.Delivredm =  (this.Delivred*100)/ this.somme;
                this.Delivredm = parseFloat(this.Delivredm.toFixed(2));
              }

            }

          },err =>{
            console.log(err);
            return false;
          });
        }

      }
      else {

        if (user == 'all'){
          if (this.date[1] != null ){
            newDate1 = this.date[0].getFullYear()+'-'+(this.date[0].getMonth()+1)+'-'+this.date[0].getDate();
            newDate2 = this.date[1].getFullYear()+'-'+(this.date[1].getMonth()+1)+'-'+this.date[1].getDate();
            this.searchService.serchSecondDateDash(newDate1,newDate2)
              .subscribe((data:any) => {

                  if (!data.success) {
                    console.log('prob au niveau show-cmd.ts');
                  } else{




                    for (let cmd of data.commande){
                      switch (cmd.Statut){

                        case "New":{
                          this.NEW = cmd.nombre;
                          this.somme += cmd.nombre;
                          break;
                        }
                        case "RP1":{
                          this.RP1 = cmd.nombre;
                          this.somme += cmd.nombre;
                          break;
                        }
                        case "BV1":{
                          this.BV1 = cmd.nombre;
                          this.somme += cmd.nombre;
                          break;
                        }
                        case "NUL1":{
                          this.NUL1 = cmd.nombre;
                          this.somme += cmd.nombre;
                          break;
                        }
                        case "TILL1":{
                          this.TILL1 = cmd.nombre;
                          this.somme += cmd.nombre;
                          break;
                        }
                        case "Ordered":{
                          this.Ordered = cmd.nombre;
                          this.somme += cmd.nombre;
                          break;
                        }
                        case "RP2":{
                          this.RP2 = cmd.nombre;
                          this.somme += cmd.nombre;
                          break;
                        }
                        case "BV2":{
                          this.BV2 = cmd.nombre;
                          this.somme += cmd.nombre;
                          break;
                        }
                        case "NUL2":{
                          this.NUL2 = cmd.nombre;
                          this.somme += cmd.nombre;
                          break;
                        }
                        case "TILL2":{
                          this.TILL2 = cmd.nombre;
                          this.somme += cmd.nombre;
                          break;
                        }
                        case "Confirmed":{
                          this.Confirmed = cmd.nombre;
                          this.somme += cmd.nombre;
                          break;
                        }
                        case "Shipped":{
                          this.Shipped = cmd.nombre;
                          this.somme += cmd.nombre;
                          break;
                        }
                        case "Returned":{
                          this.Returned = cmd.nombre;
                          this.somme += cmd.nombre;
                          break;
                        }
                        case "Delivred":{
                          this.Delivred = cmd.nombre;
                          this.somme += cmd.nombre;
                          break;
                        }

                      }
                    }

                    if (this.somme !=0){
                      this.NEW_moyen =  (this.NEW*100)/ this.somme;
                      this.NEW_moyen = parseFloat(this.NEW_moyen.toFixed(2));

                      this.RP1m =  (this.RP1*100)/ this.somme;
                      this.RP1m = parseFloat(this.RP1m.toFixed(2));

                      this.BV1m =  (this.BV1*100)/ this.somme;
                      this.BV1m = parseFloat(this.BV1m.toFixed(2));

                      this.NUL1m =  (this.NUL1*100)/ this.somme;
                      this.NUL1m = parseFloat(this.NUL1m.toFixed(2));

                      this.TILL1m =  (this.TILL1*100)/ this.somme;
                      this.TILL1m = parseFloat(this.TILL1m.toFixed(2));

                      this.Orderedm =  (this.Ordered*100)/ this.somme;
                      this.Orderedm = parseFloat(this.Orderedm.toFixed(2));

                      this.RP2m =  (this.RP2*100)/ this.somme;
                      this.RP2m = parseFloat(this.RP2m.toFixed(2));

                      this.BV2m =  (this.BV2*100)/ this.somme;
                      this.BV2m = parseFloat(this.BV2m.toFixed(2));

                      this.NUL2m =  (this.NUL2*100)/ this.somme;
                      this.NUL2m = parseFloat(this.NUL2m.toFixed(2));

                      this.TILL2m =  (this.TILL2*100)/ this.somme;
                      this.TILL2m = parseFloat(this.TILL2m.toFixed(2));

                      this.Confirmedm =  (this.Confirmed*100)/ this.somme;
                      this.Confirmedm = parseFloat(this.Confirmedm.toFixed(2));

                      this.Shippedm =  (this.Shipped*100)/ this.somme;
                      this.Shippedm = parseFloat(this.Shippedm.toFixed(2));

                      this.Returnedm =  (this.Returned*100)/ this.somme;
                      this.Returnedm = parseFloat(this.Returnedm.toFixed(2));

                      this.Delivredm =  (this.Delivred*100)/ this.somme;
                      this.Delivredm = parseFloat(this.Delivredm.toFixed(2));
                    }



                  }}

                ,err =>{
                  return false;
                }

              );
          }else {

            newDate1 = this.date[0].getFullYear()+'-'+(this.date[0].getMonth()+1)+'-'+this.date[0].getDate();
            this.searchService.serchFirstDateDash(newDate1)
              .subscribe((data:any) => {

                  if (!data.success) {
                    console.log('prob au niveua du dash partie date');
                  } else{

                    for (let cmd of data.commande){
                      switch (cmd.Statut){

                        case "New":{
                          this.NEW = cmd.nombre;
                          this.somme += cmd.nombre;
                          break;
                        }
                        case "RP1":{
                          this.RP1 = cmd.nombre;
                          this.somme += cmd.nombre;
                          break;
                        }
                        case "BV1":{
                          this.BV1 = cmd.nombre;
                          this.somme += cmd.nombre;
                          break;
                        }
                        case "NUL1":{
                          this.NUL1 = cmd.nombre;
                          this.somme += cmd.nombre;
                          break;
                        }
                        case "TILL1":{
                          this.TILL1 = cmd.nombre;
                          this.somme += cmd.nombre;
                          break;
                        }
                        case "Ordered":{
                          this.Ordered = cmd.nombre;
                          this.somme += cmd.nombre;
                          break;
                        }
                        case "RP2":{
                          this.RP2 = cmd.nombre;
                          this.somme += cmd.nombre;
                          break;
                        }
                        case "BV2":{
                          this.BV2 = cmd.nombre;
                          this.somme += cmd.nombre;
                          break;
                        }
                        case "NUL2":{
                          this.NUL2 = cmd.nombre;
                          this.somme += cmd.nombre;
                          break;
                        }
                        case "TILL2":{
                          this.TILL2 = cmd.nombre;
                          this.somme += cmd.nombre;
                          break;
                        }
                        case "Confirmed":{
                          this.Confirmed = cmd.nombre;
                          this.somme += cmd.nombre;
                          break;
                        }
                        case "Shipped":{
                          this.Shipped = cmd.nombre;
                          this.somme += cmd.nombre;
                          break;
                        }
                        case "Returned":{
                          this.Returned = cmd.nombre;
                          this.somme += cmd.nombre;
                          break;
                        }
                        case "Delivred":{
                          this.Delivred = cmd.nombre;
                          this.somme += cmd.nombre;
                          break;
                        }

                      }
                    }

                    if (this.somme !=0){
                      this.NEW_moyen =  (this.NEW*100)/ this.somme;
                      this.NEW_moyen = parseFloat(this.NEW_moyen.toFixed(2));

                      this.RP1m =  (this.RP1*100)/ this.somme;
                      this.RP1m = parseFloat(this.RP1m.toFixed(2));

                      this.BV1m =  (this.BV1*100)/ this.somme;
                      this.BV1m = parseFloat(this.BV1m.toFixed(2));

                      this.NUL1m =  (this.NUL1*100)/ this.somme;
                      this.NUL1m = parseFloat(this.NUL1m.toFixed(2));

                      this.TILL1m =  (this.TILL1*100)/ this.somme;
                      this.TILL1m = parseFloat(this.TILL1m.toFixed(2));

                      this.Orderedm =  (this.Ordered*100)/ this.somme;
                      this.Orderedm = parseFloat(this.Orderedm.toFixed(2));

                      this.RP2m =  (this.RP2*100)/ this.somme;
                      this.RP2m = parseFloat(this.RP2m.toFixed(2));

                      this.BV2m =  (this.BV2*100)/ this.somme;
                      this.BV2m = parseFloat(this.BV2m.toFixed(2));

                      this.NUL2m =  (this.NUL2*100)/ this.somme;
                      this.NUL2m = parseFloat(this.NUL2m.toFixed(2));

                      this.TILL2m =  (this.TILL2*100)/ this.somme;
                      this.TILL2m = parseFloat(this.TILL2m.toFixed(2));

                      this.Confirmedm =  (this.Confirmed*100)/ this.somme;
                      this.Confirmedm = parseFloat(this.Confirmedm.toFixed(2));

                      this.Shippedm =  (this.Shipped*100)/ this.somme;
                      this.Shippedm = parseFloat(this.Shippedm.toFixed(2));

                      this.Returnedm =  (this.Returned*100)/ this.somme;
                      this.Returnedm = parseFloat(this.Returnedm.toFixed(2));

                      this.Delivredm =  (this.Delivred*100)/ this.somme;
                      this.Delivredm = parseFloat(this.Delivredm.toFixed(2));
                    }


                  }}

                ,err =>{
                  return false;
                }

              );}
          this.userChoisit = null;
        }else {
          var newDate1;
          var newDate2;
          if (this.date[1] != null ){
            newDate1 = this.date[0].getFullYear()+'-'+(this.date[0].getMonth()+1)+'-'+this.date[0].getDate();
            newDate2 = this.date[1].getFullYear()+'-'+(this.date[1].getMonth()+1)+'-'+this.date[1].getDate();
            this.searchService.serchSecondDateDashUser(newDate1,newDate2,user)
              .subscribe((data:any) => {

                  if (!data.success) {
                    console.log('prob au niveau show-cmd.ts');
                  } else{




                    for (let cmd of data.commande){
                      switch (cmd.Statut){

                        case "New":{
                          this.NEW = cmd.nombre;
                          this.somme += cmd.nombre;
                          break;
                        }
                        case "RP1":{
                          this.RP1 = cmd.nombre;
                          this.somme += cmd.nombre;
                          break;
                        }
                        case "BV1":{
                          this.BV1 = cmd.nombre;
                          this.somme += cmd.nombre;
                          break;
                        }
                        case "NUL1":{
                          this.NUL1 = cmd.nombre;
                          this.somme += cmd.nombre;
                          break;
                        }
                        case "TILL1":{
                          this.TILL1 = cmd.nombre;
                          this.somme += cmd.nombre;
                          break;
                        }
                        case "Ordered":{
                          this.Ordered = cmd.nombre;
                          this.somme += cmd.nombre;
                          break;
                        }
                        case "RP2":{
                          this.RP2 = cmd.nombre;
                          this.somme += cmd.nombre;
                          break;
                        }
                        case "BV2":{
                          this.BV2 = cmd.nombre;
                          this.somme += cmd.nombre;
                          break;
                        }
                        case "NUL2":{
                          this.NUL2 = cmd.nombre;
                          this.somme += cmd.nombre;
                          break;
                        }
                        case "TILL2":{
                          this.TILL2 = cmd.nombre;
                          this.somme += cmd.nombre;
                          break;
                        }
                        case "Confirmed":{
                          this.Confirmed = cmd.nombre;
                          this.somme += cmd.nombre;
                          break;
                        }
                        case "Shipped":{
                          this.Shipped = cmd.nombre;
                          this.somme += cmd.nombre;
                          break;
                        }
                        case "Returned":{
                          this.Returned = cmd.nombre;
                          this.somme += cmd.nombre;
                          break;
                        }
                        case "Delivred":{
                          this.Delivred = cmd.nombre;
                          this.somme += cmd.nombre;
                          break;
                        }

                      }
                    }

                    if (this.somme !=0){
                      this.NEW_moyen =  (this.NEW*100)/ this.somme;
                      this.NEW_moyen = parseFloat(this.NEW_moyen.toFixed(2));

                      this.RP1m =  (this.RP1*100)/ this.somme;
                      this.RP1m = parseFloat(this.RP1m.toFixed(2));

                      this.BV1m =  (this.BV1*100)/ this.somme;
                      this.BV1m = parseFloat(this.BV1m.toFixed(2));

                      this.NUL1m =  (this.NUL1*100)/ this.somme;
                      this.NUL1m = parseFloat(this.NUL1m.toFixed(2));

                      this.TILL1m =  (this.TILL1*100)/ this.somme;
                      this.TILL1m = parseFloat(this.TILL1m.toFixed(2));

                      this.Orderedm =  (this.Ordered*100)/ this.somme;
                      this.Orderedm = parseFloat(this.Orderedm.toFixed(2));

                      this.RP2m =  (this.RP2*100)/ this.somme;
                      this.RP2m = parseFloat(this.RP2m.toFixed(2));

                      this.BV2m =  (this.BV2*100)/ this.somme;
                      this.BV2m = parseFloat(this.BV2m.toFixed(2));

                      this.NUL2m =  (this.NUL2*100)/ this.somme;
                      this.NUL2m = parseFloat(this.NUL2m.toFixed(2));

                      this.TILL2m =  (this.TILL2*100)/ this.somme;
                      this.TILL2m = parseFloat(this.TILL2m.toFixed(2));

                      this.Confirmedm =  (this.Confirmed*100)/ this.somme;
                      this.Confirmedm = parseFloat(this.Confirmedm.toFixed(2));

                      this.Shippedm =  (this.Shipped*100)/ this.somme;
                      this.Shippedm = parseFloat(this.Shippedm.toFixed(2));

                      this.Returnedm =  (this.Returned*100)/ this.somme;
                      this.Returnedm = parseFloat(this.Returnedm.toFixed(2));

                      this.Delivredm =  (this.Delivred*100)/ this.somme;
                      this.Delivredm = parseFloat(this.Delivredm.toFixed(2));
                    }



                  }}

                ,err =>{
                  return false;
                }

              );
          }else {

            newDate1 = this.date[0].getFullYear()+'-'+(this.date[0].getMonth()+1)+'-'+this.date[0].getDate();
            this.searchService.serchFirstDateDashUser(newDate1,user)
              .subscribe((data:any) => {

                  if (!data.success) {
                    console.log('prob au niveua du dash partie date');
                  } else{

                    for (let cmd of data.commande){
                      switch (cmd.Statut){

                        case "New":{
                          this.NEW = cmd.nombre;
                          this.somme += cmd.nombre;
                          break;
                        }
                        case "RP1":{
                          this.RP1 = cmd.nombre;
                          this.somme += cmd.nombre;
                          break;
                        }
                        case "BV1":{
                          this.BV1 = cmd.nombre;
                          this.somme += cmd.nombre;
                          break;
                        }
                        case "NUL1":{
                          this.NUL1 = cmd.nombre;
                          this.somme += cmd.nombre;
                          break;
                        }
                        case "TILL1":{
                          this.TILL1 = cmd.nombre;
                          this.somme += cmd.nombre;
                          break;
                        }
                        case "Ordered":{
                          this.Ordered = cmd.nombre;
                          this.somme += cmd.nombre;
                          break;
                        }
                        case "RP2":{
                          this.RP2 = cmd.nombre;
                          this.somme += cmd.nombre;
                          break;
                        }
                        case "BV2":{
                          this.BV2 = cmd.nombre;
                          this.somme += cmd.nombre;
                          break;
                        }
                        case "NUL2":{
                          this.NUL2 = cmd.nombre;
                          this.somme += cmd.nombre;
                          break;
                        }
                        case "TILL2":{
                          this.TILL2 = cmd.nombre;
                          this.somme += cmd.nombre;
                          break;
                        }
                        case "Confirmed":{
                          this.Confirmed = cmd.nombre;
                          this.somme += cmd.nombre;
                          break;
                        }
                        case "Shipped":{
                          this.Shipped = cmd.nombre;
                          this.somme += cmd.nombre;
                          break;
                        }
                        case "Returned":{
                          this.Returned = cmd.nombre;
                          this.somme += cmd.nombre;
                          break;
                        }
                        case "Delivred":{
                          this.Delivred = cmd.nombre;
                          this.somme += cmd.nombre;
                          break;
                        }

                      }
                    }

                    if (this.somme !=0){
                      this.NEW_moyen =  (this.NEW*100)/ this.somme;
                      this.NEW_moyen = parseFloat(this.NEW_moyen.toFixed(2));

                      this.RP1m =  (this.RP1*100)/ this.somme;
                      this.RP1m = parseFloat(this.RP1m.toFixed(2));

                      this.BV1m =  (this.BV1*100)/ this.somme;
                      this.BV1m = parseFloat(this.BV1m.toFixed(2));

                      this.NUL1m =  (this.NUL1*100)/ this.somme;
                      this.NUL1m = parseFloat(this.NUL1m.toFixed(2));

                      this.TILL1m =  (this.TILL1*100)/ this.somme;
                      this.TILL1m = parseFloat(this.TILL1m.toFixed(2));

                      this.Orderedm =  (this.Ordered*100)/ this.somme;
                      this.Orderedm = parseFloat(this.Orderedm.toFixed(2));

                      this.RP2m =  (this.RP2*100)/ this.somme;
                      this.RP2m = parseFloat(this.RP2m.toFixed(2));

                      this.BV2m =  (this.BV2*100)/ this.somme;
                      this.BV2m = parseFloat(this.BV2m.toFixed(2));

                      this.NUL2m =  (this.NUL2*100)/ this.somme;
                      this.NUL2m = parseFloat(this.NUL2m.toFixed(2));

                      this.TILL2m =  (this.TILL2*100)/ this.somme;
                      this.TILL2m = parseFloat(this.TILL2m.toFixed(2));

                      this.Confirmedm =  (this.Confirmed*100)/ this.somme;
                      this.Confirmedm = parseFloat(this.Confirmedm.toFixed(2));

                      this.Shippedm =  (this.Shipped*100)/ this.somme;
                      this.Shippedm = parseFloat(this.Shippedm.toFixed(2));

                      this.Returnedm =  (this.Returned*100)/ this.somme;
                      this.Returnedm = parseFloat(this.Returnedm.toFixed(2));

                      this.Delivredm =  (this.Delivred*100)/ this.somme;
                      this.Delivredm = parseFloat(this.Delivredm.toFixed(2));
                    }

                  }}

                ,err =>{
                  return false;
                }

              );}
        }

      }
  }

  newClicked(status){
    this.statusService.status =status;
    this.statusService.clicked = true;
    this.router.navigate(['/showCmdStatut']);
  }

  ngOnInit() {
    this.commandeService.getData().subscribe((data:any) =>{

      if (!data.success) {
        console.log('prob au niveau show-cmd.ts');
      } else{

        for (let cmd of data.cmd){
          switch (cmd.Statut){

            case "New":{
              this.NEW = cmd.nombre;
              this.somme += cmd.nombre;
              break;
            }
            case "RP1":{
              this.RP1 = cmd.nombre;
              this.somme += cmd.nombre;
              break;
            }
            case "BV1":{
              this.BV1 = cmd.nombre;
              this.somme += cmd.nombre;
              break;
            }
            case "NUL1":{
              this.NUL1 = cmd.nombre;
              this.somme += cmd.nombre;
              break;
            }
            case "TILL1":{
              this.TILL1 = cmd.nombre;
              this.somme += cmd.nombre;
              break;
            }
            case "Ordered":{
              this.Ordered = cmd.nombre;
              this.somme += cmd.nombre;
              break;
            }
            case "RP2":{
              this.RP2 = cmd.nombre;
              this.somme += cmd.nombre;
              break;
            }
            case "BV2":{
              this.BV2 = cmd.nombre;
              this.somme += cmd.nombre;
              break;
            }
            case "NUL2":{
              this.NUL2 = cmd.nombre;
              this.somme += cmd.nombre;
              break;
            }
            case "TILL2":{
              this.TILL2 = cmd.nombre;
              this.somme += cmd.nombre;
              break;
            }
            case "Confirmed":{
              this.Confirmed = cmd.nombre;
              this.somme += cmd.nombre;
              break;
            }
            case "Shipped":{
              this.Shipped = cmd.nombre;
              this.somme += cmd.nombre;
              break;
            }
            case "Returned":{
              this.Returned = cmd.nombre;
              this.somme += cmd.nombre;
              break;
            }
            case "Delivred":{
              this.Delivred = cmd.nombre;
              this.somme += cmd.nombre;
              break;
            }

          }
        }

    if (this.somme !=0){
      this.NEW_moyen =  (this.NEW*100)/ this.somme;
      this.NEW_moyen = parseFloat(this.NEW_moyen.toFixed(2));

      this.RP1m =  (this.RP1*100)/ this.somme;
      this.RP1m = parseFloat(this.RP1m.toFixed(2));

      this.BV1m =  (this.BV1*100)/ this.somme;
      this.BV1m = parseFloat(this.BV1m.toFixed(2));

      this.NUL1m =  (this.NUL1*100)/ this.somme;
      this.NUL1m = parseFloat(this.NUL1m.toFixed(2));

      this.TILL1m =  (this.TILL1*100)/ this.somme;
      this.TILL1m = parseFloat(this.TILL1m.toFixed(2));

      this.Orderedm =  (this.Ordered*100)/ this.somme;
      this.Orderedm = parseFloat(this.Orderedm.toFixed(2));

      this.RP2m =  (this.RP2*100)/ this.somme;
      this.RP2m = parseFloat(this.RP2m.toFixed(2));

      this.BV2m =  (this.BV2*100)/ this.somme;
      this.BV2m = parseFloat(this.BV2m.toFixed(2));

      this.NUL2m =  (this.NUL2*100)/ this.somme;
      this.NUL2m = parseFloat(this.NUL2m.toFixed(2));

      this.TILL2m =  (this.TILL2*100)/ this.somme;
      this.TILL2m = parseFloat(this.TILL2m.toFixed(2));

      this.Confirmedm =  (this.Confirmed*100)/ this.somme;
      this.Confirmedm = parseFloat(this.Confirmedm.toFixed(2));

      this.Shippedm =  (this.Shipped*100)/ this.somme;
      this.Shippedm = parseFloat(this.Shippedm.toFixed(2));

      this.Returnedm =  (this.Returned*100)/ this.somme;
      this.Returnedm = parseFloat(this.Returnedm.toFixed(2));

      this.Delivredm =  (this.Delivred*100)/ this.somme;
      this.Delivredm = parseFloat(this.Delivredm.toFixed(2));
    }



      }




    },err =>{
      console.log(err);
      return false;
    })

    this.commandeService.getUsers().subscribe((data:any) =>{

      if (!data.success) {
        console.log('prob au niveau getUsers');
      } else{this.users = data.users;
        // Calling the DT trigger to manually render the table

      }


    },err =>{
      console.log(err);
      return false;
    });
    this.es = {
      firstDayOfWeek: 0,
      dayNames: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
      dayNamesShort: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
      dayNamesMin: ["Di","Lu","Ma","Me","Je","Ve","Sa"],
      monthNames: [ "Janvier","février","Mars","Avril","Mai","Juin","Juillet","Août","September","Octobre","Novembre","Décembre" ],
      monthNamesShort: [ "Jan", "Févr", "Mars", "Avr", "Mai", "Juin","Juil", "Aou", "Sep", "Oct", "Nov", "Déc" ],
      today: 'Aujourd\'hui',
      clear: 'Effacer la Dates'
    }

  }

  dateEntrer(){
    var newDate1;
    var newDate2;
    this.somme = 0;
    this.NEW=0;
    this.NEW_moyen=0;


    this.RP1=0;
    this.RP1m=0;

    this.BV1=0;
    this.BV1m=0;

    this.NUL1=0;
    this.NUL1m=0;

    this.TILL1=0;
    this.TILL1m=0;

    this.Ordered=0;
    this.Orderedm=0;

    this.RP2=0;
    this.RP2m=0;

    this.BV2=0;
    this.BV2m=0;

    this.NUL2=0;
    this.NUL2m=0;

    this.TILL2=0;
    this.TILL2m=0;

    this.Confirmed=0;
    this.Confirmedm=0;

    this.Shipped=0;
    this.Shippedm=0;

    this.Returned=0;
    this.Returnedm=0;

    this.Delivred=0;
    this.Delivredm=0;
    if (this.userChoisit){
      var user = this.userChoisit;

      var newDate1;
      var newDate2;
      if (this.date[1] != null ){
        newDate1 = this.date[0].getFullYear()+'-'+(this.date[0].getMonth()+1)+'-'+this.date[0].getDate();
        newDate2 = this.date[1].getFullYear()+'-'+(this.date[1].getMonth()+1)+'-'+this.date[1].getDate();
        this.searchService.serchSecondDateDashUser(newDate1,newDate2,user)
          .subscribe((data:any) => {

              if (!data.success) {
                console.log('prob au niveau show-cmd.ts');
              } else{




                for (let cmd of data.commande){
                  switch (cmd.Statut){

                    case "New":{
                      this.NEW = cmd.nombre;
                      this.somme += cmd.nombre;
                      break;
                    }
                    case "RP1":{
                      this.RP1 = cmd.nombre;
                      this.somme += cmd.nombre;
                      break;
                    }
                    case "BV1":{
                      this.BV1 = cmd.nombre;
                      this.somme += cmd.nombre;
                      break;
                    }
                    case "NUL1":{
                      this.NUL1 = cmd.nombre;
                      this.somme += cmd.nombre;
                      break;
                    }
                    case "TILL1":{
                      this.TILL1 = cmd.nombre;
                      this.somme += cmd.nombre;
                      break;
                    }
                    case "Ordered":{
                      this.Ordered = cmd.nombre;
                      this.somme += cmd.nombre;
                      break;
                    }
                    case "RP2":{
                      this.RP2 = cmd.nombre;
                      this.somme += cmd.nombre;
                      break;
                    }
                    case "BV2":{
                      this.BV2 = cmd.nombre;
                      this.somme += cmd.nombre;
                      break;
                    }
                    case "NUL2":{
                      this.NUL2 = cmd.nombre;
                      this.somme += cmd.nombre;
                      break;
                    }
                    case "TILL2":{
                      this.TILL2 = cmd.nombre;
                      this.somme += cmd.nombre;
                      break;
                    }
                    case "Confirmed":{
                      this.Confirmed = cmd.nombre;
                      this.somme += cmd.nombre;
                      break;
                    }
                    case "Shipped":{
                      this.Shipped = cmd.nombre;
                      this.somme += cmd.nombre;
                      break;
                    }
                    case "Returned":{
                      this.Returned = cmd.nombre;
                      this.somme += cmd.nombre;
                      break;
                    }
                    case "Delivred":{
                      this.Delivred = cmd.nombre;
                      this.somme += cmd.nombre;
                      break;
                    }

                  }
                }

                if (this.somme !=0){
                  this.NEW_moyen =  (this.NEW*100)/ this.somme;
                  this.NEW_moyen = parseFloat(this.NEW_moyen.toFixed(2));

                  this.RP1m =  (this.RP1*100)/ this.somme;
                  this.RP1m = parseFloat(this.RP1m.toFixed(2));

                  this.BV1m =  (this.BV1*100)/ this.somme;
                  this.BV1m = parseFloat(this.BV1m.toFixed(2));

                  this.NUL1m =  (this.NUL1*100)/ this.somme;
                  this.NUL1m = parseFloat(this.NUL1m.toFixed(2));

                  this.TILL1m =  (this.TILL1*100)/ this.somme;
                  this.TILL1m = parseFloat(this.TILL1m.toFixed(2));

                  this.Orderedm =  (this.Ordered*100)/ this.somme;
                  this.Orderedm = parseFloat(this.Orderedm.toFixed(2));

                  this.RP2m =  (this.RP2*100)/ this.somme;
                  this.RP2m = parseFloat(this.RP2m.toFixed(2));

                  this.BV2m =  (this.BV2*100)/ this.somme;
                  this.BV2m = parseFloat(this.BV2m.toFixed(2));

                  this.NUL2m =  (this.NUL2*100)/ this.somme;
                  this.NUL2m = parseFloat(this.NUL2m.toFixed(2));

                  this.TILL2m =  (this.TILL2*100)/ this.somme;
                  this.TILL2m = parseFloat(this.TILL2m.toFixed(2));

                  this.Confirmedm =  (this.Confirmed*100)/ this.somme;
                  this.Confirmedm = parseFloat(this.Confirmedm.toFixed(2));

                  this.Shippedm =  (this.Shipped*100)/ this.somme;
                  this.Shippedm = parseFloat(this.Shippedm.toFixed(2));

                  this.Returnedm =  (this.Returned*100)/ this.somme;
                  this.Returnedm = parseFloat(this.Returnedm.toFixed(2));

                  this.Delivredm =  (this.Delivred*100)/ this.somme;
                  this.Delivredm = parseFloat(this.Delivredm.toFixed(2));
                }



              }}

            ,err =>{
              return false;
            }

          );
      }else {

        newDate1 = this.date[0].getFullYear()+'-'+(this.date[0].getMonth()+1)+'-'+this.date[0].getDate();
        this.searchService.serchFirstDateDashUser(newDate1,user)
          .subscribe((data:any) => {

              if (!data.success) {
                console.log('prob au niveua du dash partie date');
              } else{

                for (let cmd of data.commande){
                  switch (cmd.Statut){

                    case "New":{
                      this.NEW = cmd.nombre;
                      this.somme += cmd.nombre;
                      break;
                    }
                    case "RP1":{
                      this.RP1 = cmd.nombre;
                      this.somme += cmd.nombre;
                      break;
                    }
                    case "BV1":{
                      this.BV1 = cmd.nombre;
                      this.somme += cmd.nombre;
                      break;
                    }
                    case "NUL1":{
                      this.NUL1 = cmd.nombre;
                      this.somme += cmd.nombre;
                      break;
                    }
                    case "TILL1":{
                      this.TILL1 = cmd.nombre;
                      this.somme += cmd.nombre;
                      break;
                    }
                    case "Ordered":{
                      this.Ordered = cmd.nombre;
                      this.somme += cmd.nombre;
                      break;
                    }
                    case "RP2":{
                      this.RP2 = cmd.nombre;
                      this.somme += cmd.nombre;
                      break;
                    }
                    case "BV2":{
                      this.BV2 = cmd.nombre;
                      this.somme += cmd.nombre;
                      break;
                    }
                    case "NUL2":{
                      this.NUL2 = cmd.nombre;
                      this.somme += cmd.nombre;
                      break;
                    }
                    case "TILL2":{
                      this.TILL2 = cmd.nombre;
                      this.somme += cmd.nombre;
                      break;
                    }
                    case "Confirmed":{
                      this.Confirmed = cmd.nombre;
                      this.somme += cmd.nombre;
                      break;
                    }
                    case "Shipped":{
                      this.Shipped = cmd.nombre;
                      this.somme += cmd.nombre;
                      break;
                    }
                    case "Returned":{
                      this.Returned = cmd.nombre;
                      this.somme += cmd.nombre;
                      break;
                    }
                    case "Delivred":{
                      this.Delivred = cmd.nombre;
                      this.somme += cmd.nombre;
                      break;
                    }

                  }
                }

                if (this.somme !=0){
                  this.NEW_moyen =  (this.NEW*100)/ this.somme;
                  this.NEW_moyen = parseFloat(this.NEW_moyen.toFixed(2));

                  this.RP1m =  (this.RP1*100)/ this.somme;
                  this.RP1m = parseFloat(this.RP1m.toFixed(2));

                  this.BV1m =  (this.BV1*100)/ this.somme;
                  this.BV1m = parseFloat(this.BV1m.toFixed(2));

                  this.NUL1m =  (this.NUL1*100)/ this.somme;
                  this.NUL1m = parseFloat(this.NUL1m.toFixed(2));

                  this.TILL1m =  (this.TILL1*100)/ this.somme;
                  this.TILL1m = parseFloat(this.TILL1m.toFixed(2));

                  this.Orderedm =  (this.Ordered*100)/ this.somme;
                  this.Orderedm = parseFloat(this.Orderedm.toFixed(2));

                  this.RP2m =  (this.RP2*100)/ this.somme;
                  this.RP2m = parseFloat(this.RP2m.toFixed(2));

                  this.BV2m =  (this.BV2*100)/ this.somme;
                  this.BV2m = parseFloat(this.BV2m.toFixed(2));

                  this.NUL2m =  (this.NUL2*100)/ this.somme;
                  this.NUL2m = parseFloat(this.NUL2m.toFixed(2));

                  this.TILL2m =  (this.TILL2*100)/ this.somme;
                  this.TILL2m = parseFloat(this.TILL2m.toFixed(2));

                  this.Confirmedm =  (this.Confirmed*100)/ this.somme;
                  this.Confirmedm = parseFloat(this.Confirmedm.toFixed(2));

                  this.Shippedm =  (this.Shipped*100)/ this.somme;
                  this.Shippedm = parseFloat(this.Shippedm.toFixed(2));

                  this.Returnedm =  (this.Returned*100)/ this.somme;
                  this.Returnedm = parseFloat(this.Returnedm.toFixed(2));

                  this.Delivredm =  (this.Delivred*100)/ this.somme;
                  this.Delivredm = parseFloat(this.Delivredm.toFixed(2));
                }

              }}

            ,err =>{
              return false;
            }

          );}


    }else{
      if (this.date[1] != null ){
        newDate1 = this.date[0].getFullYear()+'-'+(this.date[0].getMonth()+1)+'-'+this.date[0].getDate();
        newDate2 = this.date[1].getFullYear()+'-'+(this.date[1].getMonth()+1)+'-'+this.date[1].getDate();
        this.searchService.serchSecondDateDash(newDate1,newDate2)
          .subscribe((data:any) => {

              if (!data.success) {
                console.log('prob au niveau show-cmd.ts');
              } else{




                for (let cmd of data.commande){
                  switch (cmd.Statut){

                    case "New":{
                      this.NEW = cmd.nombre;
                      this.somme += cmd.nombre;
                      break;
                    }
                    case "RP1":{
                      this.RP1 = cmd.nombre;
                      this.somme += cmd.nombre;
                      break;
                    }
                    case "BV1":{
                      this.BV1 = cmd.nombre;
                      this.somme += cmd.nombre;
                      break;
                    }
                    case "NUL1":{
                      this.NUL1 = cmd.nombre;
                      this.somme += cmd.nombre;
                      break;
                    }
                    case "TILL1":{
                      this.TILL1 = cmd.nombre;
                      this.somme += cmd.nombre;
                      break;
                    }
                    case "Ordered":{
                      this.Ordered = cmd.nombre;
                      this.somme += cmd.nombre;
                      break;
                    }
                    case "RP2":{
                      this.RP2 = cmd.nombre;
                      this.somme += cmd.nombre;
                      break;
                    }
                    case "BV2":{
                      this.BV2 = cmd.nombre;
                      this.somme += cmd.nombre;
                      break;
                    }
                    case "NUL2":{
                      this.NUL2 = cmd.nombre;
                      this.somme += cmd.nombre;
                      break;
                    }
                    case "TILL2":{
                      this.TILL2 = cmd.nombre;
                      this.somme += cmd.nombre;
                      break;
                    }
                    case "Confirmed":{
                      this.Confirmed = cmd.nombre;
                      this.somme += cmd.nombre;
                      break;
                    }
                    case "Shipped":{
                      this.Shipped = cmd.nombre;
                      this.somme += cmd.nombre;
                      break;
                    }
                    case "Returned":{
                      this.Returned = cmd.nombre;
                      this.somme += cmd.nombre;
                      break;
                    }
                    case "Delivred":{
                      this.Delivred = cmd.nombre;
                      this.somme += cmd.nombre;
                      break;
                    }

                  }
                }

                if (this.somme !=0){
                  this.NEW_moyen =  (this.NEW*100)/ this.somme;
                  this.NEW_moyen = parseFloat(this.NEW_moyen.toFixed(2));

                  this.RP1m =  (this.RP1*100)/ this.somme;
                  this.RP1m = parseFloat(this.RP1m.toFixed(2));

                  this.BV1m =  (this.BV1*100)/ this.somme;
                  this.BV1m = parseFloat(this.BV1m.toFixed(2));

                  this.NUL1m =  (this.NUL1*100)/ this.somme;
                  this.NUL1m = parseFloat(this.NUL1m.toFixed(2));

                  this.TILL1m =  (this.TILL1*100)/ this.somme;
                  this.TILL1m = parseFloat(this.TILL1m.toFixed(2));

                  this.Orderedm =  (this.Ordered*100)/ this.somme;
                  this.Orderedm = parseFloat(this.Orderedm.toFixed(2));

                  this.RP2m =  (this.RP2*100)/ this.somme;
                  this.RP2m = parseFloat(this.RP2m.toFixed(2));

                  this.BV2m =  (this.BV2*100)/ this.somme;
                  this.BV2m = parseFloat(this.BV2m.toFixed(2));

                  this.NUL2m =  (this.NUL2*100)/ this.somme;
                  this.NUL2m = parseFloat(this.NUL2m.toFixed(2));

                  this.TILL2m =  (this.TILL2*100)/ this.somme;
                  this.TILL2m = parseFloat(this.TILL2m.toFixed(2));

                  this.Confirmedm =  (this.Confirmed*100)/ this.somme;
                  this.Confirmedm = parseFloat(this.Confirmedm.toFixed(2));

                  this.Shippedm =  (this.Shipped*100)/ this.somme;
                  this.Shippedm = parseFloat(this.Shippedm.toFixed(2));

                  this.Returnedm =  (this.Returned*100)/ this.somme;
                  this.Returnedm = parseFloat(this.Returnedm.toFixed(2));

                  this.Delivredm =  (this.Delivred*100)/ this.somme;
                  this.Delivredm = parseFloat(this.Delivredm.toFixed(2));
                }



              }}

            ,err =>{
              return false;
            }

          );
      }else {

        newDate1 = this.date[0].getFullYear()+'-'+(this.date[0].getMonth()+1)+'-'+this.date[0].getDate();
        this.searchService.serchFirstDateDash(newDate1)
          .subscribe((data:any) => {

              if (!data.success) {
                console.log('prob au niveua du dash partie date');
              } else{

                for (let cmd of data.commande){
                  switch (cmd.Statut){

                    case "New":{
                      this.NEW = cmd.nombre;
                      this.somme += cmd.nombre;
                      break;
                    }
                    case "RP1":{
                      this.RP1 = cmd.nombre;
                      this.somme += cmd.nombre;
                      break;
                    }
                    case "BV1":{
                      this.BV1 = cmd.nombre;
                      this.somme += cmd.nombre;
                      break;
                    }
                    case "NUL1":{
                      this.NUL1 = cmd.nombre;
                      this.somme += cmd.nombre;
                      break;
                    }
                    case "TILL1":{
                      this.TILL1 = cmd.nombre;
                      this.somme += cmd.nombre;
                      break;
                    }
                    case "Ordered":{
                      this.Ordered = cmd.nombre;
                      this.somme += cmd.nombre;
                      break;
                    }
                    case "RP2":{
                      this.RP2 = cmd.nombre;
                      this.somme += cmd.nombre;
                      break;
                    }
                    case "BV2":{
                      this.BV2 = cmd.nombre;
                      this.somme += cmd.nombre;
                      break;
                    }
                    case "NUL2":{
                      this.NUL2 = cmd.nombre;
                      this.somme += cmd.nombre;
                      break;
                    }
                    case "TILL2":{
                      this.TILL2 = cmd.nombre;
                      this.somme += cmd.nombre;
                      break;
                    }
                    case "Confirmed":{
                      this.Confirmed = cmd.nombre;
                      this.somme += cmd.nombre;
                      break;
                    }
                    case "Shipped":{
                      this.Shipped = cmd.nombre;
                      this.somme += cmd.nombre;
                      break;
                    }
                    case "Returned":{
                      this.Returned = cmd.nombre;
                      this.somme += cmd.nombre;
                      break;
                    }
                    case "Delivred":{
                      this.Delivred = cmd.nombre;
                      this.somme += cmd.nombre;
                      break;
                    }

                  }
                }

                if (this.somme !=0){
                  this.NEW_moyen =  (this.NEW*100)/ this.somme;
                  this.NEW_moyen = parseFloat(this.NEW_moyen.toFixed(2));

                  this.RP1m =  (this.RP1*100)/ this.somme;
                  this.RP1m = parseFloat(this.RP1m.toFixed(2));

                  this.BV1m =  (this.BV1*100)/ this.somme;
                  this.BV1m = parseFloat(this.BV1m.toFixed(2));

                  this.NUL1m =  (this.NUL1*100)/ this.somme;
                  this.NUL1m = parseFloat(this.NUL1m.toFixed(2));

                  this.TILL1m =  (this.TILL1*100)/ this.somme;
                  this.TILL1m = parseFloat(this.TILL1m.toFixed(2));

                  this.Orderedm =  (this.Ordered*100)/ this.somme;
                  this.Orderedm = parseFloat(this.Orderedm.toFixed(2));

                  this.RP2m =  (this.RP2*100)/ this.somme;
                  this.RP2m = parseFloat(this.RP2m.toFixed(2));

                  this.BV2m =  (this.BV2*100)/ this.somme;
                  this.BV2m = parseFloat(this.BV2m.toFixed(2));

                  this.NUL2m =  (this.NUL2*100)/ this.somme;
                  this.NUL2m = parseFloat(this.NUL2m.toFixed(2));

                  this.TILL2m =  (this.TILL2*100)/ this.somme;
                  this.TILL2m = parseFloat(this.TILL2m.toFixed(2));

                  this.Confirmedm =  (this.Confirmed*100)/ this.somme;
                  this.Confirmedm = parseFloat(this.Confirmedm.toFixed(2));

                  this.Shippedm =  (this.Shipped*100)/ this.somme;
                  this.Shippedm = parseFloat(this.Shippedm.toFixed(2));

                  this.Returnedm =  (this.Returned*100)/ this.somme;
                  this.Returnedm = parseFloat(this.Returnedm.toFixed(2));

                  this.Delivredm =  (this.Delivred*100)/ this.somme;
                  this.Delivredm = parseFloat(this.Delivredm.toFixed(2));
                }


              }}

            ,err =>{
              return false;
            }

          );}
    }




  }

  effacerDate(){
    this.somme = 0;
    this.NEW=0;
    this.NEW_moyen=0;


    this.RP1=0;
    this.RP1m=0;

    this.BV1=0;
    this.BV1m=0;

    this.NUL1=0;
    this.NUL1m=0;

    this.TILL1=0;
    this.TILL1m=0;

    this.Ordered=0;
    this.Orderedm=0;

    this.RP2=0;
    this.RP2m=0;

    this.BV2=0;
    this.BV2m=0;

    this.NUL2=0;
    this.NUL2m=0;

    this.TILL2=0;
    this.TILL2m=0;

    this.Confirmed=0;
    this.Confirmedm=0;

    this.Shipped=0;
    this.Shippedm=0;

    this.Returned=0;
    this.Returnedm=0;

    this.Delivred=0;
    this.Delivredm=0;

    if (this.userChoisit){
      var user = this.userChoisit;
      this.commandeService.getDashUser(user).subscribe((data:any) =>{
        if (!data.success) {
          console.log('prob au niveua du dash partie date');
        } else{

          for (let cmd of data.commande){
            switch (cmd.Statut){

              case "New":{
                this.NEW = cmd.nombre;
                this.somme += cmd.nombre;
                break;
              }
              case "RP1":{
                this.RP1 = cmd.nombre;
                this.somme += cmd.nombre;
                break;
              }
              case "BV1":{
                this.BV1 = cmd.nombre;
                this.somme += cmd.nombre;
                break;
              }
              case "NUL1":{
                this.NUL1 = cmd.nombre;
                this.somme += cmd.nombre;
                break;
              }
              case "TILL1":{
                this.TILL1 = cmd.nombre;
                this.somme += cmd.nombre;
                break;
              }
              case "Ordered":{
                this.Ordered = cmd.nombre;
                this.somme += cmd.nombre;
                break;
              }
              case "RP2":{
                this.RP2 = cmd.nombre;
                this.somme += cmd.nombre;
                break;
              }
              case "BV2":{
                this.BV2 = cmd.nombre;
                this.somme += cmd.nombre;
                break;
              }
              case "NUL2":{
                this.NUL2 = cmd.nombre;
                this.somme += cmd.nombre;
                break;
              }
              case "TILL2":{
                this.TILL2 = cmd.nombre;
                this.somme += cmd.nombre;
                break;
              }
              case "Confirmed":{
                this.Confirmed = cmd.nombre;
                this.somme += cmd.nombre;
                break;
              }
              case "Shipped":{
                this.Shipped = cmd.nombre;
                this.somme += cmd.nombre;
                break;
              }
              case "Returned":{
                this.Returned = cmd.nombre;
                this.somme += cmd.nombre;
                break;
              }
              case "Delivred":{
                this.Delivred = cmd.nombre;
                this.somme += cmd.nombre;
                break;
              }

            }
          }

          if (this.somme !=0){
            this.NEW_moyen =  (this.NEW*100)/ this.somme;
            this.NEW_moyen = parseFloat(this.NEW_moyen.toFixed(2));

            this.RP1m =  (this.RP1*100)/ this.somme;
            this.RP1m = parseFloat(this.RP1m.toFixed(2));

            this.BV1m =  (this.BV1*100)/ this.somme;
            this.BV1m = parseFloat(this.BV1m.toFixed(2));

            this.NUL1m =  (this.NUL1*100)/ this.somme;
            this.NUL1m = parseFloat(this.NUL1m.toFixed(2));

            this.TILL1m =  (this.TILL1*100)/ this.somme;
            this.TILL1m = parseFloat(this.TILL1m.toFixed(2));

            this.Orderedm =  (this.Ordered*100)/ this.somme;
            this.Orderedm = parseFloat(this.Orderedm.toFixed(2));

            this.RP2m =  (this.RP2*100)/ this.somme;
            this.RP2m = parseFloat(this.RP2m.toFixed(2));

            this.BV2m =  (this.BV2*100)/ this.somme;
            this.BV2m = parseFloat(this.BV2m.toFixed(2));

            this.NUL2m =  (this.NUL2*100)/ this.somme;
            this.NUL2m = parseFloat(this.NUL2m.toFixed(2));

            this.TILL2m =  (this.TILL2*100)/ this.somme;
            this.TILL2m = parseFloat(this.TILL2m.toFixed(2));

            this.Confirmedm =  (this.Confirmed*100)/ this.somme;
            this.Confirmedm = parseFloat(this.Confirmedm.toFixed(2));

            this.Shippedm =  (this.Shipped*100)/ this.somme;
            this.Shippedm = parseFloat(this.Shippedm.toFixed(2));

            this.Returnedm =  (this.Returned*100)/ this.somme;
            this.Returnedm = parseFloat(this.Returnedm.toFixed(2));

            this.Delivredm =  (this.Delivred*100)/ this.somme;
            this.Delivredm = parseFloat(this.Delivredm.toFixed(2));
          }

        }

      },err =>{
        console.log(err);
        return false;
      });
    }

    else {
      this.commandeService.getData().subscribe((data:any) =>{

        if (!data.success) {
          console.log('prob au niveau show-cmd.ts');
        } else{


          for (let cmd of data.cmd){
            switch (cmd.Statut){

              case "New":{
                this.NEW = cmd.nombre;
                this.somme += cmd.nombre;
                break;
              }
              case "RP1":{
                this.RP1 = cmd.nombre;
                this.somme += cmd.nombre;
                break;
              }
              case "BV1":{
                this.BV1 = cmd.nombre;
                this.somme += cmd.nombre;
                break;
              }
              case "NUL1":{
                this.NUL1 = cmd.nombre;
                this.somme += cmd.nombre;
                break;
              }
              case "TILL1":{
                this.TILL1 = cmd.nombre;
                this.somme += cmd.nombre;
                break;
              }
              case "Ordered":{
                this.Ordered = cmd.nombre;
                this.somme += cmd.nombre;
                break;
              }
              case "RP2":{
                this.RP2 = cmd.nombre;
                this.somme += cmd.nombre;
                break;
              }
              case "BV2":{
                this.BV2 = cmd.nombre;
                this.somme += cmd.nombre;
                break;
              }
              case "NUL2":{
                this.NUL2 = cmd.nombre;
                this.somme += cmd.nombre;
                break;
              }
              case "TILL2":{
                this.TILL2 = cmd.nombre;
                this.somme += cmd.nombre;
                break;
              }
              case "Confirmed":{
                this.Confirmed = cmd.nombre;
                this.somme += cmd.nombre;
                break;
              }
              case "Shipped":{
                this.Shipped = cmd.nombre;
                this.somme += cmd.nombre;
                break;
              }
              case "Returned":{
                this.Returned = cmd.nombre;
                this.somme += cmd.nombre;
                break;
              }
              case "Delivred":{
                this.Delivred = cmd.nombre;
                this.somme += cmd.nombre;
                break;
              }

            }
          }

          if (this.somme !=0){
            this.NEW_moyen =  (this.NEW*100)/ this.somme;
            this.NEW_moyen = parseFloat(this.NEW_moyen.toFixed(2));

            this.RP1m =  (this.RP1*100)/ this.somme;
            this.RP1m = parseFloat(this.RP1m.toFixed(2));

            this.BV1m =  (this.BV1*100)/ this.somme;
            this.BV1m = parseFloat(this.BV1m.toFixed(2));

            this.NUL1m =  (this.NUL1*100)/ this.somme;
            this.NUL1m = parseFloat(this.NUL1m.toFixed(2));

            this.TILL1m =  (this.TILL1*100)/ this.somme;
            this.TILL1m = parseFloat(this.TILL1m.toFixed(2));

            this.Orderedm =  (this.Ordered*100)/ this.somme;
            this.Orderedm = parseFloat(this.Orderedm.toFixed(2));

            this.RP2m =  (this.RP2*100)/ this.somme;
            this.RP2m = parseFloat(this.RP2m.toFixed(2));

            this.BV2m =  (this.BV2*100)/ this.somme;
            this.BV2m = parseFloat(this.BV2m.toFixed(2));

            this.NUL2m =  (this.NUL2*100)/ this.somme;
            this.NUL2m = parseFloat(this.NUL2m.toFixed(2));

            this.TILL2m =  (this.TILL2*100)/ this.somme;
            this.TILL2m = parseFloat(this.TILL2m.toFixed(2));

            this.Confirmedm =  (this.Confirmed*100)/ this.somme;
            this.Confirmedm = parseFloat(this.Confirmedm.toFixed(2));

            this.Shippedm =  (this.Shipped*100)/ this.somme;
            this.Shippedm = parseFloat(this.Shippedm.toFixed(2));

            this.Returnedm =  (this.Returned*100)/ this.somme;
            this.Returnedm = parseFloat(this.Returnedm.toFixed(2));

            this.Delivredm =  (this.Delivred*100)/ this.somme;
            this.Delivredm = parseFloat(this.Delivredm.toFixed(2));
          }



        }




      },err =>{
        console.log(err);
        return false;
      })
    }


  }

}
