import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRecetasComponent } from './list-recetas.component';

describe('ListRecetasComponent', () => {
  let component: ListRecetasComponent;
  let fixture: ComponentFixture<ListRecetasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRecetasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRecetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
