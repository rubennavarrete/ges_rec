import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Subject, debounceTime, finalize, takeUntil } from 'rxjs';
import { Medicacion } from 'src/app/core/models/medicacion';
import { Medicamentos, RecetaResponse } from 'src/app/core/models/receta';
import { AddMedicacionesService } from 'src/app/core/services/add-medicaciones.service';
import { AddRecetaService } from 'src/app/core/services/add-receta.service';
import { AddUserService } from 'src/app/core/services/add-user.service';
import { ModalsService } from 'src/app/core/services/modals.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sell-receta',
  templateUrl: './sell-receta.component.html',
  styleUrls: ['./sell-receta.component.css']
})
export class SellRecetaComponent implements OnInit, OnDestroy{
  public isLoading = false;
  public src: string = '';
  public data$: any;

  RecError: string = '';
  FarmError: string = '';
  medicamentoform: FormGroup;
  editrecetaform: FormGroup;


  medicamentoVisible: boolean[] = []; // Arreglo para controlar la visibilidad de los botones


  elementPagina: {
    dataLength: number,
    metaData: number,
    currentPage: number
  } = {
      dataLength: 0,
      metaData: 0,
      currentPage: 0
    }

  currentPage = 1;

  medicamento: Medicamentos[] = [];

  medicamento2: Medicamentos[] = [];

  medicamentoSeleccionado: Medicamentos | null = null;
  
  idseleccionada: number = 0;

  tokenData: any;
  dataMed: any= [];
 


  get nota() {
    return this.editrecetaform.controls['nota'];
  }

  get vendidosM(){
    return this.medicamentoform.controls['vendidos'];
  }

  private destroy$ = new Subject<any>();
  
  ngOnInit(): void {

    this.medicamentoVisible = new Array(this.medicamento.length).fill(false);
    this.getTokenData();
    this.setupSubscriptions();
  }

  

  private setupSubscriptions() {
    this.srvRec.SeleccionarConfirmEditMed$.pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (data) => {
        this.dataMed = data;
        this.medicamento = this.dataMed.map((medData: Medicamentos) => ({
          nombre: medData.str_nombre_comercial,
          id_medicacion: medData.int_id_medicacion,
          cantidad: medData.int_cantidad - medData.int_vendidos,
          dosis: medData.str_dosis,
          tipo: medData.str_tipo,
          indicaciones: medData.txt_indicaciones,
          precio: medData.float_precio,
          vendidos: 0,
        }));
        this.medicamentoVisible = new Array(this.medicamento.length).fill(false);
      },
      error: (err) => {
        console.log(err);
      }
    });

    this.srvRec.SeleccionarConfirmEdit$.pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (data) => {
        this.editrecetaform.patchValue({
          id_receta: data.int_id_receta,
          id_medico: data.int_id_medico,
          id_paciente: data.int_id_paciente,
          diagnostico: data.txt_diagnostico,
          nota: data.txt_nota,
          cie: data.str_cie
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  constructor(private fb: FormBuilder, private srvRec: AddRecetaService, public srvUser:AddUserService, private cookieService: CookieService, private srvModal: ModalsService, public srvMed: AddMedicacionesService, ) {
    this.editrecetaform = this.fb.group({
      id_receta: [''],
      id_medico: [''] ,
      id_paciente: [''],
      diagnostico: ['', Validators.required],
      nota:[''],
      cie: ['', Validators.required],
      medicamentos: this.fb.array([])
    });
    this.medicamentoform = this.fb.group({
      nombreM: ['', Validators.required],
      cantidadM: ['', Validators.required],
      vendidosM: ['0'],
      dosisM: ['', Validators.required],
      tipoM: ['', Validators.required],
      indicacionesM: ['', Validators.required]
    });
    
  }

  //OBTENER TOKEN
  getTokenData() {
    const token = this.cookieService.get('token'); // Reemplaza 'nombre_de_la_cookie' con el nombre real de tu cookie
    if (token) {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      this.tokenData = tokenPayload;
      // console.log('Valores del token:', this.tokenData);
    } else {
      // console.log('Token no encontrado en las cookies.');
    }
  }

  toggleButtons(index: number): void {
    // Invierte la visibilidad del botón para el índice específico
    this.medicamentoVisible[index] = !this.medicamentoVisible[index];
}

eliminarMedicamento(index: number) {
  this.medicamento2.splice(index, 1);
  console.log(this.medicamento2);
}


sellMedicamento(index: number, value: number): void {
  const medicamento = this.medicamento[index];
  const existingMed = this.medicamento2.find(med => med.nombre === medicamento.nombre);

  if (value > medicamento.cantidad) {
    Swal.fire({
      title: 'Error',
      text: 'No puedes vender más medicamentos de los que tienes',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  } else {
    if (existingMed) {
      existingMed.vendidos = value;  // Actualiza la cantidad vendida si ya existe
    } else {
      const newMed = { ...medicamento, vendidos: value };
      this.medicamento2.push(newMed);  // Inserta un nuevo medicamento si no existe
    }
    console.log(this.medicamento2);
  }
}

checkValue(event: Event, index: number) {
  const input = event.target as HTMLInputElement;
  const value = +input.value;  // Convertir el valor a número

  if (value === 0) {
    this.eliminarMedicamento(index);
  } else {
    this.sellMedicamento(index, value);
  }
}



  //Crear receta
  editarReceta() {
    Swal.fire({
      title: '¿Está seguro que desea vender estos Medicamentos?',
      showDenyButton: true,
      confirmButtonText: 'Vender',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Vendiendo Receta',
          didOpen: () => {
            Swal.showLoading();
          },
        });
        this.editrecetaform.value.medicamentos = this.medicamento2;
        console.log(this.medicamento2);
          this.srvRec.venderReceta(this.editrecetaform.value).pipe(takeUntil(this.destroy$)).subscribe({
            next: (data: RecetaResponse) => {
              //console.log(data);
              if (data.status === 'success') {
              Swal.fire({
                title: 'Receta vendida',
                text: 'La Receta se ha vendido correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
              });
              } else {
                Swal.fire({
                  title: 'Error',
                  text: 'No se pudo vender la Receta',
                  icon: 'error',
                  confirmButtonText: 'Aceptar'
                });
              }
            },
            error: (error) => {
              console.log(error);
              this.RecError = error;
            },
            complete: () => {
              this.srvRec.setConfirmAdd(true);
              this.srvModal.closeModal();
              this.editrecetaform.reset();
              this.medicamentoform.reset();
              this.medicamento2 = [];
              this.medicamento = [];
            }
          });
      }
    });
  }


  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
