/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BancoinformacionComponent } from './bancoinformacion.component';

describe('BancoinformacionComponent', () => {
  let component: BancoinformacionComponent;
  let fixture: ComponentFixture<BancoinformacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BancoinformacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BancoinformacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
