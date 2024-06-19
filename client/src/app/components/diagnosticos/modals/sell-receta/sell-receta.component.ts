import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  medicamentoSeleccionado: Medicamentos | null = null;
  
  idseleccionada: number = 0;

  tokenData: any;
  dataMed: any= [];


  get nota() {
    return this.editrecetaform.controls['nota'];
  }

  private destroy$ = new Subject<any>();
  
  ngOnInit(): void {
    this.srvRec.SeleccionarConfirmEditMed$.pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (data) => {
        
        // Asignar dataMed a this.dataMed
        this.dataMed = data;
        this.medicamento = []; // Reiniciar el array de medicamentos
    
        // Iterar sobre cada objeto en dataMed y agregarlo a medicamento
        for (const medData of this.dataMed) {
          const nuevoMedicamento: Medicamentos = {
            nombre: medData.str_nombre_comercial ,
            id_medicacion: medData.int_id_medicacion,
            cantidad: medData.int_cantidad,
            dosis: medData.str_dosis,
            tipo: medData.str_tipo,
            indicaciones: medData.str_indicacion,
            precio: medData.float_precio,
            int_id_medicacion: 0,
            str_nombre_comercial: '',
            int_cantidad: 0,
            str_dosis: '',
            str_tipo: '',
            txt_indicaciones: '',
            float_precio: 0
          };
          this.medicamento.push(nuevoMedicamento);
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.srvRec.SeleccionarConfirmEdit$.pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (data) => {
        this.editrecetaform = this.fb.group({
          id_receta: [data.int_id_receta],
          id_medico: [data.int_id_medico] ,
          id_paciente: [data.int_id_paciente],
          diagnostico: [data.txt_diagnostico],
          nota: [data.txt_nota],
          cie: [data.str_cie],
          medicamentos: this.medicamentoform = this.fb.group({
            nombreM: ['', Validators.required],
            cantidadM: ['', Validators.required],
            vendidosM: [''],
            dosisM: ['', Validators.required],
            tipoM: ['', Validators.required],
            indicacionesM: ['', Validators.required]
          }),
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
      medicamentos: this.medicamentoform = this.fb.group({
        nombreM: ['', Validators.required],
        cantidadM: ['', Validators.required],
        vendidosM:[''],
        dosisM: ['', Validators.required],
        tipoM: ['', Validators.required],
        indicacionesM: ['', Validators.required]
      }),
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



  //Obtener medicamentos de la receta
 

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
        this.editrecetaform.value.medicamentos = this.medicamento;
        console.log(this.editrecetaform.value);
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
