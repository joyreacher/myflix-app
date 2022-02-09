import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router'
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
  /** Form values */
  @Input() userData = { Username: '', Password: '' }
  showSpinner = false
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
  }
  /**
   * ## API Call to {@link userlogin}
   */
  loginUser(): void{
    this.showSpinner = true
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      this.showSpinner = false
      this.dialogRef.close()
      localStorage.setItem('user', result.user.username),
      localStorage.setItem('token', result.token),
      this.snackBar.open(
        `Hello ${result.user.username}.`,
        "OK", {
        duration:2000
      })
      this.router.navigate(['home'])
    },(error) =>{
      this.showSpinner = false
      this.snackBar.open(
        `${error.message}`,
        "OK", {
        duration:5000
      })
    })
  }
}
