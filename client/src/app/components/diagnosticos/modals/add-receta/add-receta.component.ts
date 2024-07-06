import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { initFlowbite } from 'flowbite';
import { CookieService } from 'ngx-cookie-service';
import { Subject, debounceTime, finalize, takeUntil } from 'rxjs';
import { Medicacion } from 'src/app/core/models/medicacion';
import { User } from 'src/app/core/models/user';
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


  // Variables para pacientes
  isLoading2 = false;
  datas$: any[] = [];
  private destroy$ = new Subject<void>();
  private searchInputSubject2 = new Subject<string>();
  searchStarted2 = false;
  PacienteSelec: User | null = null;
  FarmError: any;
  // Variables para medicamentos
  isLoading = false;
  data$ = [];
  private searchInputSubject = new Subject<string>();
  searchStarted = false;
  medicacionSelec: Medicacion | null = null;
  src: string = '';
  src2: string = '';
  idseleccionada: number = 0;
  medicamentoform: FormGroup;

  RecError: string = '';
  recetaform: FormGroup;

  medicamento: Medicamentos[] = [] ;

  medicamentoSeleccionado: Medicamentos | null = null;


  tipoMedicamento: string = '';

  tokenData: any;

  confirmadd: boolean = false;

  get nombreP() {
    return this.recetaform.controls['nombreP'];
  }

  get nombreM() {
    return this.medicamentoform.controls['nombreM'];
  }
  get cantidadM() {
    return this.medicamentoform.controls['cantidadM'];
  }
  get dosisM() {
    return this.medicamentoform.controls['dosisM'];
  }
  get tipoM() {
    return this.medicamentoform.controls['tipoM'];
  }
  get indicacionesM() {
    return this.medicamentoform.controls['indicacionesM'];
  }
  get diagnostico() {
    return this.recetaform.controls['diagnostico'];
  }
   get cie () {
    return this.recetaform.controls['cie'];
  }

  
  ngOnInit(): void {
    initFlowbite();
    

    this.getTokenData();

    // Buscar medicamento
    this.searchInputSubject.pipe(
      debounceTime(300) // Ajusta el valor en milisegundos según lo necesario
    ).subscribe((value) => {
      this.buscarMedicamento(value);
    });

     // Buscar Paciente
     this.searchInputSubject2.pipe(
      debounceTime(300) // Ajusta el valor en milisegundos según lo necesario
    ).subscribe((value) => {
      this.buscarPaciente(value);
    });
    
    this.srvUser.SeleccionarConfirmEdit$.pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (data) => {
        this.recetaform = this.fb.group({
          nombreP: [''],
          id_medico: [this.tokenData.id_usuario] ,
          id_paciente: [data.int_id_usuario],
          diagnostico: ['', Validators.required],
          cie: ['', Validators.required],
          medicamentos: this.medicamentoform = this.fb.group({
            nombreM: ['', Validators.required],
            cantidadM: ['',[Validators.required, Validators.pattern(/^[0-9]+$/)]],
            dosisM: ['', Validators.required],
            tipoM: [{ value: '', disabled: true }, Validators.required],
            precioM: 0,
            indicacionesM: ['', Validators.required]
          }),
        });
      },
      error: (err) => {
        console.log(err);
      }
    });

    this.srvRec.SeleccionarConfirmAdd$.pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (data) => {
        if (data === true){
          this.confirmadd = true;
        }else{
          this.confirmadd = false;
        }
        
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  constructor(private fb: FormBuilder, private srvRec: AddRecetaService, public srvUser:AddUserService, private cookieService: CookieService, public srvModals: ModalsService) {
    this.recetaform = this.fb.group({
      nombreP: [''] ,
      id_medico: [''] ,
      id_paciente: [''],
      diagnostico: ['', Validators.required],
      cie: ['', Validators.required],
      medicamentos: this.medicamentoform = this.fb.group({
        nombreM: ['', Validators.required],
        cantidadM: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
        dosisM: ['', Validators.required],
        tipoM: ['', Validators.required],
        precioM: 0,
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

    // Método de búsqueda de pacientes
    buscarPaciente(value: string) {
      this.isLoading2 = true;
      console.log('ESTOY EN BUSQUUEDA',value);
      this.srvUser.getPaciente(value).pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.isLoading2 = false;
        })
      ).subscribe({
        next: (data) => {
          this.datas$ [0]= data;
        },
        error: (error) => {
          console.log(error);
          this.FarmError = error;
        }
      });
    }
  
    onSearchInputChange2(event: Event) {
      const value = (event.target as HTMLInputElement).value.trim();
      this.searchInputSubject2.next(value);
      if (value.length === 0) {
        this.searchStarted2 = false;
      } else {
        this.searchStarted2 = true;
      }
    }
  
    selectPaciente(item: User) {
      this.PacienteSelec = item;
      this.src2 = item.str_cedula;
      this.recetaform.patchValue({
        nombreP: item.str_nombres + ' ' + item.str_apellidos,
        id_paciente: item.int_id_usuario
      });
      this.searchStarted2 = false;
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
        this.datas$[1] = data;
        console.log(data);
      },
      error: (error) => {
        console.log(error);
        this.FarmError = error;
      }

    });
  }


  onSearchInputChange(event: Event) {
    const value = (event.target as HTMLInputElement).value.trim();
    this.searchInputSubject.next(value);
    if (value.length === 0) {
        this.searchStarted = false; // Si no hay valor en el input, desactiva la búsqueda
    } else {
        this.searchStarted = true; // Si hay valor en el input, activa la búsqueda
    }
}

  select(item: Medicacion) {
    this.medicacionSelec = item;
    this.src = item.str_nombre_comercial;
    this.idseleccionada = item.int_id_medicacion;
    this.medicamentoform.patchValue({
      tipoM: item.str_forma_farmaceutica,
      precioM: item.float_precio
    });
    this.tipoMedicamento = item.str_forma_farmaceutica;
    this.searchStarted = false; // Oculta la lista de medicamentos después de seleccionar uno
  }


  //Agregar medicamento
  addMedicamento() {
    const nombreM = this.medicamentoform.value.nombreM;
    const cantidadM = this.medicamentoform.value.cantidadM;
    const dosisM = this.medicamentoform.value.dosisM;
    const tipoM = this.tipoMedicamento;
    const indicacionesM = this.medicamentoform.value.indicacionesM;
    const precioM = this.medicamentoform.value.precioM;

    let campoVacio = '';

    // Verificar qué campo está vacío
    if (!nombreM) {
        campoVacio = 'Nombre';
    } else if (!cantidadM) {
        campoVacio = 'Cantidad';
    } else if (!dosisM) {
        campoVacio = 'Dosis';
    } else if (!indicacionesM) {
        campoVacio = 'Indicaciones';
    }

    // Si algún campo está vacío, mostrar mensaje de alerta
    if (campoVacio) {
        alert(`Por favor, complete el campo ${campoVacio} antes de agregar el medicamento.`);
        return; // Detener la ejecución si hay algún campo vacío
    }

    if (this.medicamentoSeleccionado) {
        // Editar el objeto seleccionado
        this.medicamentoSeleccionado.nombre = nombreM;
        this.medicamentoSeleccionado.cantidad = cantidadM;
        this.medicamentoSeleccionado.dosis = dosisM;
        this.medicamentoSeleccionado.tipo = tipoM;
        this.medicamentoSeleccionado.indicaciones = indicacionesM;

        this.medicamentoSeleccionado = null; // Reiniciar el objeto seleccionado
    } else {
        // Crear un nuevo objeto y agregarlo al array
        const nuevoMedicamento: Medicamentos = {
            nombre: nombreM,
            id_medicacion: this.idseleccionada,
            cantidad: cantidadM,
            dosis: dosisM,
            tipo: tipoM,
            indicaciones: indicacionesM,
            precio: precioM,
            vendidos: 0,
            int_id_medicacion: 0,
            str_nombre_comercial: '',
            int_cantidad: 0,
            str_dosis: '',
            str_tipo: '',
            txt_indicaciones: '',
            float_precio: 0,
            int_vendidos: 0,
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
      cantidadM: med.cantidad,
      tipoM: med.tipo,
      indicacionesM: med.indicaciones
    });
  }

  //Eliminar medicamento
  eliminarMedicamento(index: number) {
    this.medicamento.splice(index, 1);
  }

  imputModal(title: string, name: string) {
    this.srvModals.setFormModal({ title, name });
    this.srvModals.openModal();
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
              this.srvModals.closeModal();
              this.recetaform.reset();
              this.medicamentoform.reset();
              this.confirmadd = true;
              this.medicamento = [];
            }
          });
      }
    });
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
