import { Component } from '@angular/core';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {
  showPicker = false;
  selectedDate: Date | undefined;
  minDate: Date;
  maxDate: Date;

  constructor() {
    // Configurar las fechas mínima y máxima según tus requisitos
    this.minDate = new Date('2000-01-01');
    this.maxDate = new Date('2030-12-31');
  }

  openPicker() {
    this.showPicker = true;
  }

  closePicker() {
    this.showPicker = false;
  }
}
