/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AgendarPageATComponent } from './agendarPageAT.component';

describe('AgendarPageATComponent', () => {
  let component: AgendarPageATComponent;
  let fixture: ComponentFixture<AgendarPageATComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgendarPageATComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendarPageATComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
