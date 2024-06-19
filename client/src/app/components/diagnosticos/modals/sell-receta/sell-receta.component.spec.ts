import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellRecetaComponent } from './sell-receta.component';

describe('SellRecetaComponent', () => {
  let component: SellRecetaComponent;
  let fixture: ComponentFixture<SellRecetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellRecetaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellRecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
