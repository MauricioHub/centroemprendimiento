/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { TreeChecklistExample } from './TreeChecklistExample.component';


describe('TreeChecklistExampleComponent', () => {
  let component: T;
  let fixture: ComponentFixture<TreeChecklistExample>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeChecklistExample ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeChecklistExample);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
