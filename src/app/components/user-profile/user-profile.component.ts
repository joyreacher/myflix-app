import { Component, OnInit } from '@angular/core';
import { UserUpdateFormComponent } from '../user-update-form/user-update-form.component';
import { UserDeleteFormComponent } from '../user-delete-form/user-delete-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
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
