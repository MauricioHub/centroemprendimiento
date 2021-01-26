/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MntActividadComponent } from './mntActividad.component';

describe('MntActividadComponent', () => {
  let component: MntActividadComponent;
  let fixture: ComponentFixture<MntActividadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MntActividadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MntActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
