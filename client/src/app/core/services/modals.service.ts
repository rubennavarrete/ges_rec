import { Injectable } from '@angular/core';
import { DataFormModal } from '../models/modals';
import { BehaviorSubject, Observable } from 'rxjs';

const initmodal: DataFormModal = { title: '', name: '' }

@Injectable({
  providedIn: 'root'
})
export class ModalsService {

  private FormModal$ = new BehaviorSubject<DataFormModal>(initmodal);

  constructor() { }

  
  setFormModal(data: DataFormModal) {
    this.FormModal$.next(data);
  }

  getFormModal$() : Observable<DataFormModal> {
    return this.FormModal$.asObservable();
  }


  openModal() {
    let modalGeneral = document.getElementById('modalGeneral') as any;
    if (modalGeneral) {
      modalGeneral.style.display = 'block';
      modalGeneral.classList.add('show');
      modalGeneral.style.backgroundColor = 'rgba(0,0,0,0.5)';
      setTimeout(() => {
        if (modalGeneral) {
          modalGeneral.style.opacity = 1;
        }
      }); //FOR TRANSITION
    }
  }

  closeModal() {
    let modalGeneral = document.getElementById('modalGeneral') as any;

    if (modalGeneral) {
      modalGeneral.style.display = 'none';
      modalGeneral.classList.remove('show');
      modalGeneral.style.opacity = 1;
    }
  }


}
