import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(
    public router:Router
  ) { }

  /**
   * ## User validation
   * @description Calls {@link getUser} on init
   */
  ngOnInit(): void {
    this.getUser()
  }
  /**
   * ## Checks ```localStorage``` for token 
   * @returns string - username to display
   * If token exists leave on main page and return username from ```localStorage```
   * Else route to welcome screen
   */
  getUser(): any{
    if(!localStorage.getItem('token')){
      this.router.navigate(['welcome'])
    }
    return localStorage.getItem('user');
  }
}
