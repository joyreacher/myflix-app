import { Component } from '@angular/core';
import { UserRegisterFormComponent } from './components/user-register-form/user-register-form.component';
import { Grid } from './interface/Grid';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public dialog: MatDialog
  ) {}
  
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegisterFormComponent, {
      width: '280px'
    })
  }

  title = 'myFlix-app';
  tiles = { text: 'Welcom to Myflix'}
}
