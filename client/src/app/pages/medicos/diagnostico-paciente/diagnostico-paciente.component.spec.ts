import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticoPacienteComponent } from './diagnostico-paciente.component';

describe('DiagnosticoPacienteComponent', () => {
  let component: DiagnosticoPacienteComponent;
  let fixture: ComponentFixture<DiagnosticoPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnosticoPacienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiagnosticoPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
