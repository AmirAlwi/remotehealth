import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDataDialogComponent } from './patient-data-dialog.component';

describe('PatientDataDialogComponent', () => {
  let component: PatientDataDialogComponent;
  let fixture: ComponentFixture<PatientDataDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientDataDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientDataDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
