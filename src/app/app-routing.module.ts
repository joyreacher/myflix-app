import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRegisterFormComponent } from './components/user-register-form/user-register-form.component';
import { UserLoginFormComponent } from './components/user-login-form/user-login-form.component';

const routes: Routes = [
  {path: '', component: UserRegisterFormComponent},
  {path: 'login', component: UserLoginFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
