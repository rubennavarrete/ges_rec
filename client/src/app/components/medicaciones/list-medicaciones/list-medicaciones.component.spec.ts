import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMedicacionesComponent } from './list-medicaciones.component';

describe('ListMedicacionesComponent', () => {
  let component: ListMedicacionesComponent;
  let fixture: ComponentFixture<ListMedicacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMedicacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListMedicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
