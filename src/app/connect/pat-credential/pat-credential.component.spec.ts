import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatCredentialComponent } from './pat-credential.component';

describe('PatCredentialComponent', () => {
  let component: PatCredentialComponent;
  let fixture: ComponentFixture<PatCredentialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatCredentialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatCredentialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
