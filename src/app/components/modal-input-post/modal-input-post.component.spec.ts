import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInputPostComponent } from './modal-input-post.component';

describe('ModalInputPostComponent', () => {
  let component: ModalInputPostComponent;
  let fixture: ComponentFixture<ModalInputPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalInputPostComponent]
    });
    fixture = TestBed.createComponent(ModalInputPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
