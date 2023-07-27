import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicacionesComponent } from './medicaciones.component';

describe('MedicacionesComponent', () => {
  let component: MedicacionesComponent;
  let fixture: ComponentFixture<MedicacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
