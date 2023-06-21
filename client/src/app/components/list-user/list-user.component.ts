import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  showWindow1: boolean = true;
  showWindow2: boolean = false;
  constructor() { }
  
  toggleWindows() {
    this.showWindow1 = !this.showWindow1;
    this.showWindow2 = !this.showWindow2;
  }
  ngOnInit(): void {    
  }
}
