import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HdTestComponent } from './hd-test.component';

describe('HdTestComponent', () => {
  let component: HdTestComponent;
  let fixture: ComponentFixture<HdTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HdTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HdTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
