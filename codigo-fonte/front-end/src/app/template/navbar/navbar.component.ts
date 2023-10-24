import { Component, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {


  @Output() openSidebarEE = new EventEmitter();
  openSidebar: boolean = true;




  modelChangeFn(e: boolean) {
    this.openSidebar = e;
    this.openSidebarEE.emit(this.openSidebar)
  }




}
