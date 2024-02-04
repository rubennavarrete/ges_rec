import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaMedicacionesComponent } from './lista-medicaciones.component';

describe('ListaMedicacionesComponent', () => {
  let component: ListaMedicacionesComponent;
  let fixture: ComponentFixture<ListaMedicacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaMedicacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaMedicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
