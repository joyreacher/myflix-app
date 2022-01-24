import { Component, Input, OnInit } from '@angular/core';
// import angular material
import { MatDialogRef } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
// API Service
import { FetchApiDataService } from '../../services/fetch-api-data.service'

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '' }
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  loginUser(): void{
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      this.dialogRef.close()
      this.snackBar.open(
        `${result.user.username}, you may login.`,
        "OK", {
        duration:2000
      })
    }, (result) => {
      this.snackBar.open(result, "OK", {
        duration:2000
      })
    })
  }
}
