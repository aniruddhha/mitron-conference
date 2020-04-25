import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallDashComponent } from './call-dash.component';

describe('CallDashComponent', () => {
  let component: CallDashComponent;
  let fixture: ComponentFixture<CallDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
