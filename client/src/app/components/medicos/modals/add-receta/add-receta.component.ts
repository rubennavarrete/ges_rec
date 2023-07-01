import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl, Form } from '@angular/forms';
import { Subject } from 'rxjs';
import { Receta } from 'src/app/core/models/receta';

@Component({
  selector: 'app-add-receta',
  templateUrl: './add-receta.component.html',
  styleUrls: ['./add-receta.component.css']
})
export class AddRecetaComponent implements OnInit, OnDestroy {

  FarmError: string = '';
  recetaform: FormGroup;

  medicamento: Receta[] = [] ;

  medicamentoSeleccionado: Receta | null = null;


  get nombreM() {
    return this.recetaform.controls['nombreM'];
  }
  get dosisM() {
    return this.recetaform.controls['dosisM'];
  }
  get duracionM() {
    return this.recetaform.controls['duracionM'];
  }
  get indicacionesM() {
    return this.recetaform.controls['indicacionesM'];
  }

  private destroy$ = new Subject<any>();
  
  constructor(private fb: FormBuilder) {
    this.recetaform = this.fb.group({
      nombreM: ['', Validators.required],
      dosisM: ['', Validators.required],
      duracionM: ['', Validators.required],
      indicacionesM: ['', Validators.required]
    });
  }

  addMedicamento() {
    if (this.medicamentoSeleccionado) {
      // Editar el objeto seleccionado
      this.medicamentoSeleccionado.nombre = this.recetaform.value.nombreM;
      this.medicamentoSeleccionado.dosis = this.recetaform.value.dosisM;
      this.medicamentoSeleccionado.duracion = this.recetaform.value.duracionM;
      this.medicamentoSeleccionado.indicaciones = this.recetaform.value.indicacionesM;
  
      this.medicamentoSeleccionado = null; // Reiniciar el objeto seleccionado
    } else {
      // Crear un nuevo objeto y agregarlo al array
      const nuevoMedicamento: Receta = {
        nombre: this.recetaform.value.nombreM,
        dosis: this.recetaform.value.dosisM,
        duracion: this.recetaform.value.duracionM,
        indicaciones: this.recetaform.value.indicacionesM
      };
      this.medicamento.push(nuevoMedicamento);
    }

    console.log(this.medicamento);
  
    this.recetaform.reset();
  }

  editarMedicamento(med: Receta) {
    this.medicamentoSeleccionado = med;
    this.recetaform.patchValue({
      nombreM: med.nombre,
      dosisM: med.dosis,
      duracionM: med.duracion,
      indicacionesM: med.indicaciones
    });
  }

  eliminarMedicamento(index: number) {
    this.medicamento.splice(index, 1);
    console.log(this.medicamento);
  }

  enviarReceta() {
    const url = 'http://tu-servidor.com/api/recetas'; // Reemplaza con la URL de tu servidor
    const recetaData = { medicamento: this.medicamento };
  
  }
  

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
