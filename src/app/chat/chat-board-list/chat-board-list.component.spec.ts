import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBoardListComponent } from './chat-board-list.component';

describe('ChatBoardListComponent', () => {
  let component: ChatBoardListComponent;
  let fixture: ComponentFixture<ChatBoardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatBoardListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatBoardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
