import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { FetchApiDataService } from 'src/app/services/fetch-api-data.service';

@Component({
  selector: 'app-user-delete-form',
  templateUrl: './user-delete-form.component.html',
  styleUrls: ['./user-delete-form.component.scss']
})
export class UserDeleteFormComponent implements OnInit {
  @Input() userData = { Username: '', Email:''}
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  deleteUser(username:string, email:string):any{
    console.log('deleeeeeeete')
    console.log(username, email)
    this.fetchApiData.deleteUser({"Username":localStorage.getItem('user'), "Email": email}).subscribe((response)=>{
      console.log(response)
      this.snackBar.open(
        'User was deleted',
        'OK',{
          duration:5000
        }
      )
    })
  }
}
