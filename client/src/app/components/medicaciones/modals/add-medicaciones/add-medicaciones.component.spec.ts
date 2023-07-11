import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMedicacionesComponent } from './add-medicaciones.component';

describe('AddMedicacionesComponent', () => {
  let component: AddMedicacionesComponent;
  let fixture: ComponentFixture<AddMedicacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMedicacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMedicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
