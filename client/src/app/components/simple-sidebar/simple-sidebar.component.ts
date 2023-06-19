import { Component ,ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-simple-sidebar',
  templateUrl: './simple-sidebar.component.html',
  styleUrls: ['./simple-sidebar.component.css']
})

export class SimpleSidebarComponent {
  constructor(private elementRef: ElementRef) {}
  
  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
