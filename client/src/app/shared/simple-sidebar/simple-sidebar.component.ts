import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SidebarService } from 'src/app/core/services/sidebar.service';

@Component({
  selector: 'app-simple-sidebar',
  templateUrl: './simple-sidebar.component.html',
  styleUrls: ['./simple-sidebar.component.css']
})

export class SimpleSidebarComponent implements OnInit {
  constructor(private elementRef: ElementRef,
    private srvSideBar: SidebarService) { }

  isSidebarOpen: boolean = false;
  isDropdownPagesOpen = false;
  isDropdownSalesOpen = false;

  ngOnInit(): void {


    let buttonSidebar = document.getElementById('toggle-sidebar')
    let pContainer = document.querySelector('.pContainer');
    let sidebarBody = document.querySelector(".sidebar");
    let sidebarA = document.querySelector('.link-opcion');
    let settings = document.querySelector('.settings');


    sidebarA?.classList.remove('close')
    pContainer?.classList.remove('close')
    settings?.classList.remove('close')
    buttonSidebar?.classList.remove('close')
    sidebarBody?.classList.remove('close')
    this.srvSideBar.getBool(false)

    if (window.innerWidth < 640) {

      console.log("window.innerWidth < 768")
      let pAside = document.querySelector(".pAside")
      pAside?.classList.toggle('close');
    }
    else {
      const sidebar = document.getElementById('pSidebar')
      const aside = document.getElementById('idAside')

      

      if (this.isSidebarOpen === false) {
        aside?.classList.remove('close')
      } else {
        aside?.classList.toggle('close')
      }

      this.srvSideBar.getBool(this.isSidebarOpen)
    }
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    const dividAside = document.querySelector('#idAside') as HTMLDivElement
    let buttonSidebar = document.getElementById('toggle-sidebar')
    let pContainer = document.querySelector('.pContainer');
    let sidebarBody = document.querySelector(".sidebar");
    let sidebarA = document.querySelector('.link-opcion');
    let settings = document.querySelector('.settings');
    let pAside = document.querySelector(".pAside")

    pAside?.classList.toggle('close');



    if (window.innerWidth < 768) {

      console.log("window.innerWidth < 768")
      let pAside = document.querySelector(".pAside")
      let content = document.querySelector(".content")
      content?.classList.toggle("closeC")
      // pAside?.classList.toggle('close');


    } else {
      // let pAside = document.querySelector(".pAside")

      // pAside?.classList.toggle('close');


      const sidebar = document.getElementById('pSidebar')
      const aside = document.getElementById('idAside')

      if (this.isSidebarOpen === true) {
        aside?.classList.remove('close')
      } else {
        aside?.classList.toggle('close')
      }

      this.srvSideBar.getBool(this.isSidebarOpen)
    }

    if (dividAside.classList.contains('close')) {
      sidebarA?.classList.remove('close')
      pContainer?.classList.remove('close')
      settings?.classList.remove('close')
      buttonSidebar?.classList.remove('close')
      sidebarBody?.classList.remove('close')
      this.srvSideBar.getBool(false)


    } else {


      sidebarA?.classList.toggle('close')
      pContainer?.classList.toggle('close')
      settings?.classList.toggle('close')
      buttonSidebar?.classList.toggle('close')
      sidebarBody?.classList.toggle('close')
      this.srvSideBar.getBool(true)

    }
  }

  dropdownsOpen: { [key: string]: boolean } = {};

  toggleDropdown(id: string) {
    this.dropdownsOpen[id] = !this.dropdownsOpen[id];
  }

  isDropdownOpen(id: string) {
    return this.dropdownsOpen[id];
  }


}
