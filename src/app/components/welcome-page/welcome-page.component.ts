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

  ngOnInit(): void {
    this.routeToHomeView()
  }
  
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegisterFormComponent, {
      width: '280px'
    })
  }

  openUserLoginDialog(): void{
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    })
  }
  
  openMoviesDialog(): void {
    this.dialog.open(MovieCardComponent, {
      width: '500px'
    })
  }

  routeToHomeView(): void{
    if(localStorage.getItem('token')){
      console.log('there is a token')
      this.fetchApiData.getAllMovies().subscribe((response: any) => {
        console.log(response)
        this.router.navigate(['home'])
      })
    }
  }

}
