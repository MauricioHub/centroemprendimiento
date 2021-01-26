/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MntEtapaComponent } from './mntEtapa.component';

describe('MntEtapaComponent', () => {
  let component: MntEtapaComponent;
  let fixture: ComponentFixture<MntEtapaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MntEtapaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MntEtapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
