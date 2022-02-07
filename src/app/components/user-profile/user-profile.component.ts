import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserUpdateFormComponent } from '../user-update-form/user-update-form.component';
import { UserDeleteFormComponent } from '../user-delete-form/user-delete-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { FetchApiDataService } from '../../services/fetch-api-data.service'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  /**
 * ## User object used to display user data in template
 */
  user = {
    userName: localStorage.getItem('user'),
    token: localStorage.getItem('token'),
    email:'',
    birthday: '',
    favorite_movies: []
  }
  /** 
  * ## number used to increase row height on handheld devices 
  * 
  */
  rows:number
destroyed = new Subject<void>()
  /** ## Material UI [progress spinner](https://material.angular.io/components/progress-spinner/overview) */
showSpinner = false
/**
* ## Screen size as string value
* 
 */
currentScreenSize: string
/**
  ## Number used to determine Breakpoints
 */
breakpoint: number
/**
* ## Name map used to map breakpoints to string value
 */
displayNameMap = new Map([
  [Breakpoints.XSmall, 'XSmall'],
  [Breakpoints.Small, 'Small'],
  [Breakpoints.Medium, 'Medium'],
  [Breakpoints.Large, 'Large'],
  [Breakpoints.XLarge, 'XLarge'],
])
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router,
    public breakpointObserver:BreakpointObserver,
    public snackbar: MatSnackBar
  ) {
    breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(takeUntil(this.destroyed))
      .subscribe(result => {
        for(const query of Object.keys(result.breakpoints)){
          if(result.breakpoints[query]){
            this.currentScreenSize = this.displayNameMap.get(query) ?? 'Unknown'
            this.onResize(this.currentScreenSize)
          }
        }
      })
  }
  /**
   * # When this component is loaded
   * {@linkcode getUserCredentials} to retrieve token
   * {@linkcode getUserInfo} to retrieve data from database
   * 
   */
  ngOnInit(): void {
    this.getUserCredentials()
    this.getUserInfo()
  }
  /**
   * ## Authenticate using JWT
   * @returns token string
   */
  getUserCredentials(): any{
    if(!localStorage.getItem('token')){
      this.router.navigate(['welcome'])
    }
    return localStorage.getItem('user');
  }
  /**
   * ## Trigger MatDialog to display {@linkcode UserUpdateFormComponent}
   */
  openUpdateUserDialog(): void{
    this.dialog.open(UserUpdateFormComponent, {
      width: '350px'
    })
  }
  /**
   * ## Trigger MatDialog to display {@linkcode UserDeleteFormComponent}
   */
  openDeleteUserDialog(): void{
    this.dialog.open(UserDeleteFormComponent, {
      width: '350px'
    })
  }
  /**
   * ## User info from DB
   * @returns User Object | Stored in {@linkcode user}
   */
  getUserInfo(): any{
    this.showSpinner = true
    return this.fetchApiData.getUser(this.user.userName).subscribe((result) =>{
      this.showSpinner = false
      let date = new Date(result.birthday)
      this.user.userName = result.username,
      this.user.email = result.email,
      this.user.birthday = date.toLocaleDateString(),
      this.user.favorite_movies = result.favorite_movies
    })
  }
  /**
   * ## Remove a user's favorite movie
   * @param username is the string value of the current logged in user
   * @param movieTitle is the string value of the movie title to remove
   */
  deleteFavoriteMovie(username:any, movieTitle:any){
    this.fetchApiData.deleteFavoriteMovie(username, movieTitle).subscribe((response)=>{
    }, () => {
      window.location.reload()
      })
  }
  /**
   * ## Runs whenever the viewport has changed
   * @param currentScreenSize is the string value used to determine number of {@link rows} and {@link breakpoint} to use
   */
  onResize(currentScreenSize: string): any{
    switch(currentScreenSize){
      case 'XSmall':
        this.breakpoint = 1
        this.rows = 4
        break
      case 'Small':
        this.breakpoint = 1
        this.rows = 2
        break
      case 'Medium':
        this.breakpoint = 2
        this.rows = 2
        break
      case 'Large':
        this.breakpoint = 3
        this.rows = 2
        break
      case 'XLarge':
        this.breakpoint = 4
        this.rows = 2
        break
    }
  }
}
