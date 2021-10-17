import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityListPageComponent } from './activity-list-page.component';

describe('ActivityListPageComponent', () => {
  let component: ActivityListPageComponent;
  let fixture: ComponentFixture<ActivityListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
