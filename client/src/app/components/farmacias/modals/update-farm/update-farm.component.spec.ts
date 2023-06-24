import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFarmComponent } from './update-farm.component';

describe('UpdateFarmComponent', () => {
  let component: UpdateFarmComponent;
  let fixture: ComponentFixture<UpdateFarmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateFarmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateFarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
