import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
import { FetchApiDataService } from '../../services/fetch-api-data.service'


@Component({
  selector: 'app-user-register-form',
  templateUrl: './user-register-form.component.html',
  styleUrls: ['./user-register-form.component.scss']
})
export class UserRegisterFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' }

  constructor(
    public fetchApiData: FetchApiDataService,
    // Material dialog uses form compontnet
    public dialogRef: MatDialogRef<UserRegisterFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      // successful registration
      this.dialogRef.close()
      this.snackBar.open(
        `${result.username}, you may login.`,
        'OK', {
        duration: 5000
      });
    }, (result) => {
      console.log(result)
      this.snackBar.open(
        result,
        'OK', {
        duration: 2000
      })
    })
  }
}
