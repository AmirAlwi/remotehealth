import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatLogComponent } from './pat-log.component';

describe('PatLogComponent', () => {
  let component: PatLogComponent;
  let fixture: ComponentFixture<PatLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
