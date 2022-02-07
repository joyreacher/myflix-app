import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
import { FetchApiDataService } from 'src/app/services/fetch-api-data.service';

@Component({
  selector: 'app-user-update-form',
  templateUrl: './user-update-form.component.html',
  styleUrls: ['./user-update-form.component.scss']
})
export class UserUpdateFormComponent implements OnInit {
  /** ## Values from form */
  @Input() updatedUserData = { Username: '', Password:'', Email: '', Birthday: '' }
  /** 
  *## Values to send 
  * values come from form data or DB
  */
  user = {username: '', password: '', email: '', birthday: ''}
  /** ## Value returned from MatDatePicker */
  selected: Date | '';
  constructor(
    public fetchApiDate: FetchApiDataService,
    public dialogRef: MatDialogRef<UserUpdateFormComponent>,
    public snackBar: MatSnackBar
  ) { }
  /**
   * ## ```this.fetchApiDate.getUser()``` is run to populate {@link user}
   */
  ngOnInit(): void {
    this.fetchApiDate.getUser(localStorage.getItem('user')).subscribe((response) =>{
      this.user = response
    })
  }
  /**
   * ## Sorts out date values to return m/d/yyyy format
   * @param dob 
   * @returns 
   */
  returnDate(dob:any = null):any{
    let day, month, year
    // format the returned date value 
    this.selected = new Date(this.selected)
    // retrieve specific date values
    day = this.selected.getDate()
    year = this.selected.getFullYear()
    // find string value from month number
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
    // only if month day and year are not empty or null
    if(month && day && year){
      let date = month + '/' + day +'/'+year
      this.updatedUserData.Birthday = date
      // return the updated value to use as both - display in template and data to send
      return this.updatedUserData.Birthday
    }
    return false
  }
  /**
   * ## Add form values to {@link user} object
   */
  updateUser(): any{
    // If form values are null or empty use the current user value or localStorage
    let user ={
      userName: !this.updatedUserData.Username || this.updatedUserData.Username == '' ? localStorage.getItem('user') : this.updatedUserData.Username,
      password: this.updatedUserData.Password,
      email: !this.updatedUserData.Email || this.updatedUserData.Email === '' ? this.user.email : this.updatedUserData.Email,
      birthday: !this.updatedUserData.Birthday || this.updatedUserData.Birthday === '' ? this.user.birthday :this.updatedUserData.Birthday
    }
    this.requestUpdate(user)
  }
  /**
   * ## API call to {@link editUser} 
   * @param user object 
   */
  requestUpdate(user:any):any{
    this.fetchApiDate.editUser(user).subscribe((response) => {
      this.dialogRef.close()
      this.snackBar.open(
        `${response.username}, your profile has been updated.`,
        'OK', {
        duration: 5000
      });
      localStorage.setItem('user', response.username)
      window.location.reload()
    })
  }
  /**
   * ## Cancel update
   */
  cancelUpdate():void{
    this.dialogRef.close()
  }
}
