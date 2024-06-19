import { Component } from '@angular/core';

//SERVICIOS
import { ModalsService } from 'src/app/core/services/modals.service';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.css']
})
export class ModalsComponent {

  constructor(public srvModals: ModalsService) { 
    
  }

  public title: string = '';
  public name: string = '';

  ngOnInit(): void {
    this.srvModals.getFormModal$().subscribe({
      next: (data) => {
        console.log(data);
        this.title = data.title;
        this.name = data.name;
      }
    })
  }

  cerrarModal() {
    localStorage.clear();
    this.srvModals.closeModal();
    this.name = 'clear';
    this.title = '';
    this.srvModals.openModal();
    this.srvModals.closeModal();
    
  }

}
