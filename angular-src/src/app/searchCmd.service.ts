import { Injectable } from '@angular/core';
import {HttpHeaders} from "@angular/common/http";
import {HttpClient} from  '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import {AuthService} from "./components/auth.service";


@Injectable()
export class SearchServiceService {


  // baseUrl: string = 'http://108.179.208.217:3001/commande/search/';
 // Url: string = 'http://108.179.208.217:3001/';

  baseUrl: string = 'http://localhost:3000/commande/search/';
  Url: string = 'http://localhost:3000/';
  constructor(
    private http: HttpClient,
    private authService:AuthService
  ) { }

  search(terms: Observable<string>) {
    return terms.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => this.searchEntries(term));
  }
  searchStatut(terms: Observable<string>,statut) {
    return terms.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => this.searchEntriesStatut(term,statut));
  }


  serchFirstDate(date1){
    let headers = new HttpHeaders();

    headers.append('Content-Type', 'application/json');

    return this.http
      .get(this.Url+'commande/searchDate/' +  date1,{headers: headers})
      ;
      }

  serchFirstDateDash(date1){
    let headers = new HttpHeaders();

    headers.append('Content-Type', 'application/json');

    return this.http
      .get(this.Url+'commande/searchDateDash/' +  date1,{headers: headers})
      ;
  }
  serchFirstDateDashUser(date1,user){
    let headers = new HttpHeaders();

    headers.append('Content-Type', 'application/json');

    return this.http
      .get(this.Url+'commande/searchDateDash/OneDateUser/?date1=' +  date1+'&user='+user,{headers: headers})
      ;
  }


  serchSecondDateDash(date1,date2){
    let headers = new HttpHeaders();

    headers.append('Content-Type', 'application/json');

    return this.http
      .get(this.Url+'commande/searchDate/twoDateDash/?date1=' +  date1+'&date2='+date2,{headers: headers})
      ;

  }
  serchSecondDateDashUser(date1,date2,user){
    let headers = new HttpHeaders();

    headers.append('Content-Type', 'application/json');

    return this.http
      .get(this.Url+'commande/searchDate/twoDateDashUser/?date1=' +  date1+'&date2='+date2+'&user='+user,{headers: headers});

  }



  serchFirstDateStatut(date1,statut){
    let headers = new HttpHeaders();

    headers.append('Content-Type', 'application/json');

    return this.http
      .get(this.Url+'commande/searchDateStatut/?date=' +  date1+'&statut='+statut,{headers: headers})
      ;
  }

      serchSecondDate(date1,date2){
    let headers = new HttpHeaders();

    headers.append('Content-Type', 'application/json');

    return this.http
      .get(this.Url+'commande/searchDate/twoDate/?date1=' +  date1+'&date2='+date2,{headers: headers})
      ;

      }

      serchSecondDateUser(date1,date2,user){
    let headers = new HttpHeaders();

    headers.append('Content-Type', 'application/json');

    return this.http
      .get(this.Url+'commande/searchDate/twoDateUser/?date1=' +  date1+'&date2='+date2+'&user='+user,{headers: headers})
      ;

      }




  serchSecondDateStatut(date1,date2,statut){
    let headers = new HttpHeaders();

    headers.append('Content-Type', 'application/json');

    return this.http
      .get(this.Url+'commande/searchDate/twoDateStatut/?date1=' +  date1+'&date2='+date2+'&statut='+statut,{headers: headers})
      ;

  }


  searchEntries(term) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

      if (term.length == 0)
        return this.http.get(this.Url+'commande/getCmd',{headers: headers});

      return this.http
        .get(this.baseUrl +  term,{headers: headers});

  }

  searchEntriesStatut(term,statut) {
    let headers = new HttpHeaders();

    headers.append('Content-Type', 'application/json');
    if (term.length == 0)
      return this.http.get(this.Url+'commande/getCmdByStatus/'+statut,{headers: headers});

   return this.http
     .get(this.Url+'commande/searchStatut/?term=' +  term+'&statut='+statut,{headers: headers});


  }

}
