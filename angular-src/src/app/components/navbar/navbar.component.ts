import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAdmin: Boolean;

  constructor(
    private router: Router,
    public authService: AuthService

  ) { }

  ngOnInit() {

  }


  onLogout(){
    this.authService.logout();
    this.router.navigate(['/login']);
    return false;
  }

}