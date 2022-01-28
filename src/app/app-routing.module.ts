import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { UserRegisterFormComponent } from './components/user-register-form/user-register-form.component';
import { UserLoginFormComponent } from './components/user-login-form/user-login-form.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';

const routes: Routes = [
  {path: 'welcome', component: WelcomePageComponent},
  {path: 'movies', component: MovieCardComponent},
  {path: '', redirectTo: 'welcome', pathMatch: 'prefix'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
