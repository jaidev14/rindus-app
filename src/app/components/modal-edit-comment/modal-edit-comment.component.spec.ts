import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditCommentComponent } from './modal-edit-comment.component';

describe('ModalEditCommentComponent', () => {
  let component: ModalEditCommentComponent;
  let fixture: ComponentFixture<ModalEditCommentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalEditCommentComponent]
    });
    fixture = TestBed.createComponent(ModalEditCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
