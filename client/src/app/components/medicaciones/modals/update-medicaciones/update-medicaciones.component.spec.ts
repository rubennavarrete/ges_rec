import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMedicacionesComponent } from './update-medicaciones.component';

describe('UpdateMedicacionesComponent', () => {
  let component: UpdateMedicacionesComponent;
  let fixture: ComponentFixture<UpdateMedicacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMedicacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateMedicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
