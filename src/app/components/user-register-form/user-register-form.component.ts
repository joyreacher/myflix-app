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
  /** ## Form values */
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' }
  /** ## DatePicker value */
  selected: Date | '';
  showSpinner = false
  constructor(
    public fetchApiData: FetchApiDataService,
    // Material dialog uses form compontnet
    public dialogRef: MatDialogRef<UserRegisterFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }
  /**
   * ## Registering a user
   * @description Takes the userData object to send post request to {@link userRegistration}
   */
  registerUser(): void {
    this.showSpinner = true
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      this.showSpinner = false
      // successful registration
      this.dialogRef.close()
      this.snackBar.open(
        `${result.username}, you may login.`,
        'OK', {
        duration: 5000
      });
    }, (error) => {
      this.showSpinner = false
      console.log(error)
      this.snackBar.open(
        `${error}`,
        'OK', {
        duration: 5000
      })
    })
  }
  /**
   * ## Format date values
   * @returns userData.Birthday as a string value in the form of m/d/yyyy
   */
  returnDate(): any{
    let day, month, year
    this.selected = new Date(this.selected)
    day = this.selected.getDate()
    year = this.selected.getFullYear()
    switch(this.selected.getMonth()){
      case 0:
        month = "January"
        break
      case 1:
        month = "February"
        break
      case 2:
        month = "March"
        break
      case 3:
        month = "April"
        break
      case 4:
        month = "May"
        break
      case 5:
        month = "June"
        break
      case 6:
        month = "July"
        break
      case 7:
        month = "August"
        break
      case 8:
        month = "September"
        break
      case 9:
        month = "October"
        break
      case 10:
        month = "November"
        break
      case 11:
        month = "December"
        break
    }
    if(month && day && year){
      let date = month + '/' + day +'/'+year
      this.userData.Birthday = date
      return this.userData.Birthday
    }
    return 
  }
}
