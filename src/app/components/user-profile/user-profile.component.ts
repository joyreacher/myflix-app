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

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getUser()
  }

  getUser(): any{
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

  getUserInfo(): any{
    const user = {
      firstName: localStorage.getItem('user')
    }
    return user
  }
}
