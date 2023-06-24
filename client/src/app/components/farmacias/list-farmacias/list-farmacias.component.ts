import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-farmacias',
  templateUrl: './list-farmacias.component.html',
  styleUrls: ['./list-farmacias.component.css']
})
export class ListFarmaciasComponent implements OnInit {
  showWindow1: boolean = true;
  showWindow2: boolean = false;
  constructor() { }
  
  toggleWindows() {
    this.showWindow1 = !this.showWindow1;
    this.showWindow2 = !this.showWindow2;
  }
  ngOnInit(): void {}
}
