import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Subject, debounceTime, finalize, takeUntil } from 'rxjs';
import { Medicacion } from 'src/app/core/models/medicacion';
import { Medicamentos, RecetaResponse } from 'src/app/core/models/receta';
import { AddRecetaService } from 'src/app/core/services/add-receta.service';
import { AddUserService } from 'src/app/core/services/add-user.service';
import { ModalsService } from 'src/app/core/services/modals.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-receta',
  templateUrl: './add-receta.component.html',
  styleUrls: ['./add-receta.component.css']
})
export class AddRecetaComponent implements OnInit, OnDestroy {
  public isLoading = false;
  public src: string = '';
  public data$: any;
  searchStarted: boolean = false;
  RecError: string = '';
  FarmError: string = '';
  medicamentoform: FormGroup;
  recetaform: FormGroup;

  medicamento: Medicamentos[] = [] ;

  medicamentoSeleccionado: Medicamentos | null = null;

  idseleccionada: number = 0;

  tokenData: any;

  get nombreM() {
    return this.medicamentoform.controls['nombreM'];
  }
  get cantidadM() {
    return this.medicamentoform.controls['cantidadM'];
  }
  get dosisM() {
    return this.medicamentoform.controls['dosisM'];
  }
  get duracionM() {
    return this.medicamentoform.controls['duracionM'];
  }
  get indicacionesM() {
    return this.medicamentoform.controls['indicacionesM'];
  }
  get diagnostico() {
    return this.recetaform.controls['diagnostico'];
  }

  private destroy$ = new Subject<any>();
  
  ngOnInit(): void {

    this.getTokenData();

    // Buscar medicamento
    this.searchInputSubject.pipe(
      debounceTime(300) // Ajusta el valor en milisegundos según lo necesario
    ).subscribe((value) => {
      this.buscarMedicamento(value);
    });
    
    this.srvUser.SeleccionarConfirmEdit$.pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (data) => {
        this.recetaform = this.fb.group({
          id_medico: [this.tokenData.id_usuario] ,
          id_paciente: [data.int_id_usuario],
          diagnostico: ['', Validators.required],
          medicamentos: this.medicamentoform = this.fb.group({
            nombreM: ['', Validators.required],
            cantidadM: ['', Validators.required],
            dosisM: ['', Validators.required],
            duracionM: ['', Validators.required],
            indicacionesM: ['', Validators.required]
          }),
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  constructor(private fb: FormBuilder, private srvRec: AddRecetaService, public srvUser:AddUserService, private cookieService: CookieService, private srvModal: ModalsService) {
    this.recetaform = this.fb.group({
      id_medico: [''] ,
      id_paciente: [''],
      diagnostico: ['', Validators.required],
      medicamentos: this.medicamentoform = this.fb.group({
        nombreM: ['', Validators.required],
        cantidadM: ['', Validators.required],
        dosisM: ['', Validators.required],
        duracionM: ['', Validators.required],
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

  //Buscar medicamento
  buscarMedicamento(value: string) {
    // console.log(value);
    this.isLoading = true;
    this.srvRec.getMedicamentos(value).pipe(
      takeUntil(this.destroy$),
      finalize(() => {
        this.isLoading = false;
      }
      )
    ).subscribe({
      next: (data) => {
        this.data$ = data;
        // //console.log(data);
      },
      error: (error) => {
        console.log(error);
        this.FarmError = error;
      }

    });
  }
  private searchInputSubject = new Subject<string>();

  onSearchInputChange(event: Event) {
    const value = (event.target as HTMLInputElement).value.trim();
    this.searchInputSubject.next(value);
    this.searchStarted = value.length > 0;
  }

  medicacionSelec: Medicacion | null = null;

  select(item: Medicacion) {
    this.medicacionSelec = item;
    this.src = item.str_nombre_comercial;
    this.idseleccionada = item.int_id_medicacion;
    this.searchStarted = false; // Oculta la lista de medicamentos después de seleccionar uno
  }


  //Agregar medicamento
  addMedicamento() {
    if (this.medicamentoSeleccionado) {
      // Editar el objeto seleccionado
      this.medicamentoSeleccionado.nombre = this.medicamentoform.value.nombreM;
      this.medicamentoSeleccionado.cantidad = this.medicamentoform.value.cantidadM;
      this.medicamentoSeleccionado.dosis = this.medicamentoform.value.dosisM;
      this.medicamentoSeleccionado.duracion = this.medicamentoform.value.duracionM;
      this.medicamentoSeleccionado.indicaciones = this.medicamentoform.value.indicacionesM;
  
      this.medicamentoSeleccionado = null; // Reiniciar el objeto seleccionado
    } else {
      // Crear un nuevo objeto y agregarlo al array
      const nuevoMedicamento: Medicamentos = {
        nombre: this.medicamentoform.value.nombreM,
        id_medicacion:  this.idseleccionada,
        cantidad: this.medicamentoform.value.cantidadM,
        dosis: this.medicamentoform.value.dosisM,
        duracion: this.medicamentoform.value.duracionM,
        indicaciones: this.medicamentoform.value.indicacionesM,
        int_id_medicacion: 0,
        str_nombre_comercial: '',
        str_cantidad: '',
        str_dosis: '',
        str_duracion: '',
        txt_indicaciones: '',
      };
      this.medicamento.push(nuevoMedicamento);
    }

    // console.log(this.medicamento);
  
    this.medicamentoform.reset();
  }

    //Editar medicamento
  editarMedicamento(med: Medicamentos) {
    this.medicamentoSeleccionado = med;
    this.medicamentoform.patchValue({
      nombreM: med.nombre,
      dosisM: med.dosis,
      duracionM: med.duracion,
      indicacionesM: med.indicaciones
    });
  }

  //Eliminar medicamento
  eliminarMedicamento(index: number) {
    this.medicamento.splice(index, 1);
    console.log(this.medicamento);
  }

  //Crear receta
  postReceta() {
    Swal.fire({
      title: '¿Está seguro que desea crear esta Receta?',
      showDenyButton: true,
      confirmButtonText: 'Crear',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Creando Receta',
          didOpen: () => {
            Swal.showLoading();
          },
        });
        this.recetaform.value.medicamentos = this.medicamento;
        console.log(this.recetaform.value);
          this.srvRec.postReceta(this.recetaform.value).pipe(takeUntil(this.destroy$)).subscribe({
            next: (data: RecetaResponse) => {
              //console.log(data);
              if (data.status === 'success') {
              Swal.fire({
                title: 'Receta registrada',
                text: 'La Receta se ha registrado correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
              });

              
              } else {
                Swal.fire({
                  title: 'Error',
                  text: 'No se pudo crear la Receta',
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
              this.recetaform.reset();
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
