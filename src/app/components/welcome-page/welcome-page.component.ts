import { Component, OnInit } from '@angular/core';
import { UserRegisterFormComponent } from '../user-register-form/user-register-form.component';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router'
import { FetchApiDataService } from 'src/app/services/fetch-api-data.service';
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public fetchApiData: FetchApiDataService,
    public router: Router
  ) { }

  /**
   * ## Run on init
   * @description {@link routeToHomeView} checks localStorage for token 
   */
  ngOnInit(): void {
    this.routeToHomeView()
  }
  /**
   * ## Open dialog to register new users
   *@description Triggers the MatDialog to open and display the {@link UserRegisterFormComponent}
   * @returns
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegisterFormComponent, {
      width: '300px'
    })
  }
  /**
   * ## Open dialog to Login
   * @description Triggers the MatDialog to open and display the {@link UserLoginFormComponent}
   */
  openUserLoginDialog(): void{
    this.dialog.open(UserLoginFormComponent, {
      width: '300px'
    })
  }
  /**
   * ## Check if user is logged in 
   * @description Check ```localStorage``` for token value used for authorization
   * If a token exists route to home page
   * Else keep on welcome page
   */
  routeToHomeView(): void{
    if(localStorage.getItem('token')){
      this.router.navigate(['home'])
    }
  }

}
