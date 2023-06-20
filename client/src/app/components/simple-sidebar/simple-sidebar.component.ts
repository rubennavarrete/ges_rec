import { Component ,ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-simple-sidebar',
  templateUrl: './simple-sidebar.component.html',
  styleUrls: ['./simple-sidebar.component.css']
})

export class SimpleSidebarComponent {
  constructor(private elementRef: ElementRef) {}
  
  isSidebarOpen = false;
  isDropdownPagesOpen = false;
  isDropdownSalesOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  
  dropdownsOpen: { [key: string]: boolean } = {};

  toggleDropdown(id: string) {
    this.dropdownsOpen[id] = !this.dropdownsOpen[id];
  }

  isDropdownOpen(id: string) {
    return this.dropdownsOpen[id];
  }
}
