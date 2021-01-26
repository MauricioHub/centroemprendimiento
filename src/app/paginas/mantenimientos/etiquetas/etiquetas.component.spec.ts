/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EtiquetasComponent } from './etiquetas.component';

describe('EtiquetasComponent', () => {
  let component: EtiquetasComponent;
  let fixture: ComponentFixture<EtiquetasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtiquetasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtiquetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
