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
  @Input() updatedUserData = { Username: '', Password:'', Email: '', Birthday: '' }
  user = {username: '', password: '', email: '', birthday: ''}
  selected: Date | '';
  constructor(
    public fetchApiDate: FetchApiDataService,
    public dialogRef: MatDialogRef<UserUpdateFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.fetchApiDate.getUser(localStorage.getItem('user')).subscribe((response) =>{
      this.user = response
    })
  }

  returnDate(dob:any = null):any{
    console.log(dob)
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
      this.updatedUserData.Birthday = date
      return this.updatedUserData.Birthday
    }
    return false
  }

  updateUser(): any{
    // If form values are null or empty use the current user value or localStorage
    let user ={
      userName: !this.updatedUserData.Username || this.updatedUserData.Username == '' ? localStorage.getItem('user') : this.updatedUserData.Username,
      password: this.updatedUserData.Password,
      email: !this.updatedUserData.Email || this.updatedUserData.Email === '' ? this.user.email : this.updatedUserData.Email,
      birthday: !this.updatedUserData.Birthday || this.updatedUserData.Birthday === '' ? this.user.birthday :this.updatedUserData.Birthday
    }
    if(this.returnDate()){
      this.requestUpdate(user)
    }
  }

  requestUpdate(user:any):any{
    this.fetchApiDate.editUser(user).subscribe((response) => {
      console.log(response)
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

  cancelUpdate():void{
    this.dialogRef.close()
  }
}
