import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleMainComponent } from './simple-main.component';

describe('SimpleMainComponent', () => {
  let component: SimpleMainComponent;
  let fixture: ComponentFixture<SimpleMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
