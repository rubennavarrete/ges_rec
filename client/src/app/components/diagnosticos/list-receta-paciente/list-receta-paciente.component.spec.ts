import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRecetaPacienteComponent } from './list-receta-paciente.component';

describe('ListRecetaPacienteComponent', () => {
  let component: ListRecetaPacienteComponent;
  let fixture: ComponentFixture<ListRecetaPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRecetaPacienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRecetaPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
