/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Change_passwordComponent } from './change_password.component';

describe('Change_passwordComponent', () => {
  let component: Change_passwordComponent;
  let fixture: ComponentFixture<Change_passwordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Change_passwordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Change_passwordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
