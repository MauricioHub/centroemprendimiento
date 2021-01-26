/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MntActividadEditComponent } from './mntActividadEdit.component';

describe('MntActividadEditComponent', () => {
  let component: MntActividadEditComponent;
  let fixture: ComponentFixture<MntActividadEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MntActividadEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MntActividadEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
