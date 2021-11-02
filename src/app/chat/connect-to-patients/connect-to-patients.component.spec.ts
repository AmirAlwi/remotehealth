import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectToPatientsComponent } from './connect-to-patients.component';

describe('ConnectToPatientsComponent', () => {
  let component: ConnectToPatientsComponent;
  let fixture: ComponentFixture<ConnectToPatientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectToPatientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectToPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
