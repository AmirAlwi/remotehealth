import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostQuestionsComponent } from './post-questions.component';

describe('PostQuestionsComponent', () => {
  let component: PostQuestionsComponent;
  let fixture: ComponentFixture<PostQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostQuestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
