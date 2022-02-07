import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(
    public router: Router,
  ) { }

  ngOnInit(): void {
  }
  /**
   * ## Router helper
   * @description Used to route to various views 
   * @param page 
   * @returns 
   */
  route(page: string): any{
    return this.router.navigate([`${page}`])
  }
  /**
   * ## Signing out
   * @description Used to log a user out using the 'signout' button in navigation
   */
  signOut(){
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    this.route('welcome')
  }
  /**
   * ## Check if user is logged in
   * @description Conditional logic to display appropriate navbar
   * @returns true if token is set in ```localStorage```
   */
  isUserLoggedIn(): any{
    if(!localStorage.getItem('token')){
      return false
    }
    return true
  }
}
