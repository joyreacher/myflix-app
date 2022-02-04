import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from '@angular/cdk/layout';
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatDialogModule } from '@angular/material/dialog'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { FormsModule } from '@angular/forms'
import {MatGridListModule} from '@angular/material/grid-list'; 
import { MatIconModule } from '@angular/material/icon'
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { AppComponent } from './app.component';
import { UserRegisterFormComponent } from './components/user-register-form/user-register-form.component';
import { UserLoginFormComponent } from './components/user-login-form/user-login-form.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserUpdateFormComponent } from './components/user-update-form/user-update-form.component';
import { UserDeleteFormComponent } from './components/user-delete-form/user-delete-form.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { FetchApiDataService } from './services/fetch-api-data.service';
import { GenreModalComponent } from './components/genre-modal/genre-modal.component';
import { DirectorModalComponent } from './components/director-modal/director-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    UserRegisterFormComponent,
    UserLoginFormComponent,
    MovieCardComponent,
    WelcomePageComponent,
    UserProfileComponent,
    UserUpdateFormComponent,
    UserDeleteFormComponent,
    MainPageComponent,
    NavbarComponent,
    GenreModalComponent,
    DirectorModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSnackBarModule,
    FormsModule,
    MatGridListModule,
    MatIconModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    LayoutModule
  ],
  providers: [FetchApiDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
