/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TablaActividadesDSComponent } from './tablaActividadesDS.component';

describe('TablaActividadesDSComponent', () => {
  let component: TablaActividadesDSComponent;
  let fixture: ComponentFixture<TablaActividadesDSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaActividadesDSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaActividadesDSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
