import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username?: string;
  password?: string;
  errors?: String[];

  constructor(
    private router: Router,
    private authService: AuthService
  ){

   }

  onSubmit(){
    if (this.username && this.password) {
      this.authService
                  .tentarLogar(this.username, this.password)
                  .subscribe( {
                    next: (response) =>{
                      const access_token = JSON.stringify(response);
                      localStorage.setItem('access_token',access_token);
                      this.router.navigate(['/sistema/principal']);
                    },
                    error: (errorResponse) => {
                      console.log(errorResponse);
                      this.errors = ['Usuário e/ou senha incorreto(s).']
                    }
                  });
    } else {
      this.errors = ['Usuário e/ou senha incorreto(s).']
    }
  }
}
