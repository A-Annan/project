import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: String;
  pass: String;


  constructor(
    private router:Router,
    private authService: AuthService

  ) { }

  ngOnInit() {
  }

  login(){
    const user={
      "username":this.username,
      "password": this.pass
    };
   this.authService.loginFunction(user).subscribe((data:any) => {
     if (!data.success) {
       this.router.navigate(['/login']);
     } else {
       this.authService.storeUserDate(data.token,data.user);
      if (data.user.type == 'admin') {this.router.navigate(['/dash']);}
       else this.router.navigate(['/addCmd']);
     }

   })

  }


}
