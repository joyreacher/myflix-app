import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { FetchApiDataService } from 'src/app/services/fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-delete-form',
  templateUrl: './user-delete-form.component.html',
  styleUrls: ['./user-delete-form.component.scss']
})
export class UserDeleteFormComponent implements OnInit {
  @Input() userData = { Username: '', Email:''}
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  deleteUser(username:string, email:string):any{
    this.fetchApiData.deleteUser({"Username":localStorage.getItem('user'), "Email": email}).subscribe((response)=>{
      this.dialog.closeAll()
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      this.router.navigate(['welcome'])
      this.snackBar.open(
        'User was deleted',
        'OK',{
          duration:5000
        }
      )
    })
  }
}
