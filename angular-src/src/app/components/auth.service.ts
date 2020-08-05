import { Injectable } from '@angular/core';
import {HttpClient} from  '@angular/common/http';
import {HttpHeaders} from "@angular/common/http";
import 'rxjs/add/operator/map';
import {tokenNotExpired} from "angular2-jwt";


@Injectable()
export class AuthService {

  authToken: String;
 //Url: string = 'http://108.179.208.217:3001/';
   Url: string = 'http://localhost:3000/';
  user: Object;
  type:String;

  constructor(private http: HttpClient) { }

  inscriptionAuth(user){

    let headers = new HttpHeaders();

    headers.append('Content-Type','application/json');
    return this.http.post(this.Url+'users/newUser',user,{headers: headers});

  }




  loginFunction(user){
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.http.post(this.Url+'login',user,{headers: headers});
  }

  storeUserDate(token,user ){
    localStorage.setItem('id_token',token);
    localStorage.setItem('connected','true');
    localStorage.setItem('user',JSON.stringify(user));
    localStorage.setItem('username',JSON.stringify(user.username));
    localStorage.setItem('type',JSON.stringify(user.type));
    localStorage.setItem('privilege',user.privilege);
    this.authToken = token;
    this.user = user;
    this.type = user.type;
  }

  getUser(cmd){
    let headers = new HttpHeaders();

    headers.append('Content-Type', 'application/json');

    return this.http
      .get(this.Url+'getUserCmd/' +  cmd,{headers: headers});
}

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear()
  };


  loggedIn(){
    let re = /\"/gi;
    var n = localStorage.getItem('connected');

    if (n == 'true') return true;
   return false;
  }


  isAdmin(){

   if (localStorage.getItem('type') == "\"admin\""  && this.loggedIn())
     return true;
   else return false;
  }
  add:Boolean=false;

  getAddPrivilege(){

    var prive = localStorage.getItem('privilege');

      if (prive == '100' ||prive == '101' ||prive == '110' ||prive == '111' )  return true;
      return false;

  }



  getProfile(){
    let headers = new HttpHeaders();

    headers.append('Content-Type','application/json');
    return this.http.get(this.Url+'profil',{headers: headers});
  }





  showUser(cmd) {
    console.log(cmd);
    let headers = new HttpHeaders();

    headers.append('Content-Type', 'application/json');

    return this.http
      .get(this.Url + 'users/showUsers/' + cmd.id, {headers: headers});
  }
}
