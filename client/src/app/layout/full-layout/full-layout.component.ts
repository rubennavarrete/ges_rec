import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-full-layout',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.css'],
  
})
export class FullLayoutComponent implements OnInit{
  isSidebarOpen: boolean = true;

  constructor(){}


  ngOnInit(): void {
    if(window.innerWidth > 640){
      // console.log("ventana grande");
      let content = document.querySelector(".content")
      content?.classList.toggle("closeC")
    }
  }

  
  
}
