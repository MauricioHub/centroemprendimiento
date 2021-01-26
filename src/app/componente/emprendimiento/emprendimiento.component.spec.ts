/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EmprendimientoComponent } from './emprendimiento.component';

describe('EmprendimientoComponent', () => {
  let component: EmprendimientoComponent;
  let fixture: ComponentFixture<EmprendimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmprendimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmprendimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
