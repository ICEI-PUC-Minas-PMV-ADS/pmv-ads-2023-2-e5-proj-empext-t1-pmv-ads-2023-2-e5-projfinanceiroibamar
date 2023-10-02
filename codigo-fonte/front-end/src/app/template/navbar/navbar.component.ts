import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  
  constructor(
    private router: Router,
    private authService: AuthService
  ){

   }

  logout(){
    this.authService.encerrarSessao();
    this.router.navigate(['/home']);
  }
 
}
