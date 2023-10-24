import { Component  } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  openSidebar: boolean = true;

  receberOpenSidebar(valor: boolean) {
    this.openSidebar = valor;
  }



}
