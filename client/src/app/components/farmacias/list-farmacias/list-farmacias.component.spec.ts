import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFarmaciasComponent } from './list-farmacias.component';

describe('ListFarmaciasComponent', () => {
  let component: ListFarmaciasComponent;
  let fixture: ComponentFixture<ListFarmaciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFarmaciasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListFarmaciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
