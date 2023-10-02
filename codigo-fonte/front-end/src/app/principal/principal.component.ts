import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent{
  role: string= '';

  constructor(
    private authService: AuthService,
    ) { }

    ngOnInit(): void {
    this.role = this.authService.getRole();
  }

}
