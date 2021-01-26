/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ModalFase3Component } from './modalFase3.component';

describe('ModalFase3Component', () => {
  let component: ModalFase3Component;
  let fixture: ComponentFixture<ModalFase3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalFase3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFase3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
