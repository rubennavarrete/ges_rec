import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddUserService } from '../../../core/services/add-user.service';
import { Subject, takeUntil } from 'rxjs';
import { EditUser } from 'src/app/core/models/user';




@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})


export class ListUserComponent implements OnInit,  OnDestroy {
  
  cedulaSeleccionada: string = '';
  
  
  showWindow1: boolean = true;
  showWindow2: boolean = false;
  showWindow3: boolean = false;
  dataUser: any;
  

  private destroy$ = new Subject<any>();
  constructor(public srvUser: AddUserService) { }
  
  toggleWindows() {
    this.showWindow1 = !this.showWindow1;
    this.showWindow2 = !this.showWindow2;
  }
  toggleWindows2() {
    this.showWindow1 = !this.showWindow1;
    this.showWindow3 = !this.showWindow3;
  }
  ngOnInit(): void { 
    this.srvUser.SeleccionarConfirmAdd$.pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (data) => {
        if(data){
          this.showWindow1 = data;
          this.getUsuarios(); 
          this.showWindow2 = !data; 
          this.showWindow3 = !data;
        }
      }
    });

    this.getUsuarios();

  }
  
  getUsuarios() {
    this.srvUser.getUsuarios()
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: (data) => {
        console.log(data);
        this.dataUser = data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }



  editarUsuario(cedula: string): void {
    this.cedulaSeleccionada = cedula;
    this.srvUser.getUsuario(this.cedulaSeleccionada)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: (data) => {
        console.log(data);
        this.srvUser.setConfirmEdit(data);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }


  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.unsubscribe();
  }
}
