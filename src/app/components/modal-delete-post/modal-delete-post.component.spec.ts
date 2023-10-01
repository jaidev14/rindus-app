import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeletePostComponent } from './modal-delete-post.component';

describe('ModalDeletePostComponent', () => {
  let component: ModalDeletePostComponent;
  let fixture: ComponentFixture<ModalDeletePostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalDeletePostComponent]
    });
    fixture = TestBed.createComponent(ModalDeletePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
