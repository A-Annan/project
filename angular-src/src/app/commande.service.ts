import { Injectable } from '@angular/core';
import {HttpHeaders} from "@angular/common/http";
import {HttpClient} from  '@angular/common/http';

import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";


class typecommade {

  id: Number;
  Nom :String;
  Tele: String;
  Adresse: String;
  Ville : String;
  Produit : String;
  Quantite : String;
  Prix : String;
  Statut : String;
  Note : Number;
  user : String;
  tracking:String;
}


@Injectable()
export class CommandeService {

 // Url: string = 'http://108.179.208.217:3001/';
 Url: string = 'http://localhost:3000/';
  commande: Array<typecommade>;

  getCommandeModifer(){
    return this.commande;
  }

  setCommandeModifier(cmd){
    this.commande = cmd;
  }


  constructor(
    private http:HttpClient
  ) { }

  getData(){
    let headers = new HttpHeaders();


    return this.http.get(this.Url +'commande/getData',{headers: headers});
  }


  getUsers(){
    let headers = new HttpHeaders();


    return this.http.get(this.Url +'users/getUser',{headers: headers});
  }
  searchDate(date1){

    let headers = new HttpHeaders();

  var data = {
    date:date1
  };
    return this.http
      .post(this.Url +'users/searchDateShow',data,{headers: headers});
  }

  suivreCmd(cmd){
    let headers = new HttpHeaders();

    headers.append('Content-Type','application/json');
    return this.http.post(this.Url+'commande/suivre',cmd,{headers: headers});
  }

  getCommande(user){
    let headers = new HttpHeaders();

    return this.http.get(this.Url +'commande/getCmd/'+user,{headers: headers});
  }

  getCommandetrackUser(){
    let headers = new HttpHeaders();

    return this.http.get(this.Url +'commande/getCmdTrackTele',{headers: headers});
  }

  getCommande2(user){
    let headers = new HttpHeaders();

    return this.http.get(this.Url +'commande/getCmd/'+user,{headers: headers});
  }
  getDashUser(user){
    let headers = new HttpHeaders();

    return this.http.get(this.Url +'commande/getDashUser/'+user,{headers: headers});
  }

  getCommandeByStatus(status){
    let headers = new HttpHeaders();


    return this.http.get(this.Url +'commande/getCmdByStatus/'+status,{headers: headers});
  }

  addCommande(cmd){
    let headers = new HttpHeaders();


    headers.append('Content-Type','application/json');
    return this.http.post(this.Url +'commande/newCmd',cmd,{headers: headers});
  }

  modifierCommande(cmd){
    let headers = new HttpHeaders();

    headers.append('Content-Type','application/json');
    return this.http.post(this.Url +'commande/alterCmd',cmd,{headers: headers});
  }

  modifierUser(user){
    let headers = new HttpHeaders();

    headers.append('Content-Type','application/json');
    return this.http.post(this.Url +'commande/alterUser',user,{headers: headers});
  }
  supprimerUser(user){
    let headers = new HttpHeaders();

    headers.append('Content-Type','application/json');
    return this.http.delete(this.Url +'commande/suppUser/'+user.id,{headers: headers});
  }
  supprimerCmd(cmd){
    let headers = new HttpHeaders();

    headers.append('Content-Type','application/json');
    return this.http.delete(this.Url +'commande/suppCmd/'+cmd.id,{headers: headers});
  }

  updateStatut(cmd,user){
    let headers = new HttpHeaders();
    let re = /\"/gi;

    headers.append('Content-Type', 'application/json');

    return this.http
      .get(this.Url +'commande/updateStatut/?id=' +  cmd.id+'&statut='+cmd.Statut+'&user='+user,{headers: headers});
  }

  ticket(cmd){

    let headers = new HttpHeaders();

    headers.append('Content-Type', 'application/json');

    return this.http.post(this.Url +'commande/ticket',cmd, {responseType:'blob',headers:headers});
  }


}
