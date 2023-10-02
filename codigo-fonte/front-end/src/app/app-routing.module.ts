import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { RegisterComponent } from './register/register.component';
import { authGuard } from './auth.guard';
import { PrincipalComponent } from './principal/principal.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', component: LoginComponent},
  {path: 'home', component: LoginComponent},
  {path: 'sistema', component: LayoutComponent, children: [
    {path: 'principal', component: PrincipalComponent, canActivate: [authGuard]},
    {path: '',redirectTo: '/sistema/principal', pathMatch: 'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
