import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserUpdateFormComponent } from '../user-update-form/user-update-form.component';
import { UserDeleteFormComponent } from '../user-delete-form/user-delete-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { FetchApiDataService } from '../../services/fetch-api-data.service'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
destroyed = new Subject<void>()
showSpinner = false
currentScreenSize: string
breakpoint: number
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
    public breakpointObserver:BreakpointObserver
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

  ngOnInit(): void {
    this.getUserCredentials()
    this.getUserInfo()
  }

  getUserCredentials(): any{
    if(!localStorage.getItem('token')){
      this.router.navigate(['welcome'])
    }
    return localStorage.getItem('user');
  }

  openUpdateUserDialog(): void{
    this.dialog.open(UserUpdateFormComponent, {
      width: '300px'
    })
  }

  openDeleteUserDialog(): void{
    this.dialog.open(UserDeleteFormComponent, {
      width: '300px'
    })
  }

  user = {
    userName: localStorage.getItem('user'),
    token: localStorage.getItem('token'),
    email:'',
    birthday: '',
    favorite_movies: []
  }
  getUserInfo(): any{
    this.showSpinner = true
    return this.fetchApiData.getUser(this.user.userName).subscribe((result) =>{
      this.showSpinner = false
      let date = new Date(result.birthday)
      // date.toTimeString()
      this.user.userName = result.username,
      this.user.email = result.email,
      this.user.birthday = date.toLocaleDateString(),
      this.user.favorite_movies = result.favorite_movies
    })
  }

  deleteFavoriteMovie(username:any, movieTitle:any){
    this.fetchApiData.deleteFavoriteMovie(username, movieTitle).subscribe((response)=>{
      console.log(response)
      window.location.reload()
    })
  }

  onResize(currentScreenSize: string): any{
    switch(currentScreenSize){
      case 'XSmall':
        this.breakpoint = 1
        break
      case 'Small':
        this.breakpoint = 2
        break
      case 'Medium':
        this.breakpoint = 2
        break
      case 'Large':
        this.breakpoint = 3
        break
      case 'XLarge':
        this.breakpoint = 4
        break
    }
  }
}
