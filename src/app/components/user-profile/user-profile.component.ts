import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserUpdateFormComponent } from '../user-update-form/user-update-form.component';
import { UserDeleteFormComponent } from '../user-delete-form/user-delete-form.component';
import { MatDialog } from '@angular/material/dialog';

import { FetchApiDataService } from '../../services/fetch-api-data.service'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
showSpinner = false
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router
  ) { }

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
}
