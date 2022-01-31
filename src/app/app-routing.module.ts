import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
// pages
import { MainPageComponent } from './pages/main-page/main-page.component';

const routes: Routes = [
  {path: 'welcome', component: WelcomePageComponent},
  {path: 'user', component: UserProfileComponent},
  {path: 'home', component: MainPageComponent},
  {path: '', redirectTo: 'welcome', pathMatch: 'prefix'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
