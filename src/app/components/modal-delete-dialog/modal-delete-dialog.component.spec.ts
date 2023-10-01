import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteDialogComponent } from './modal-delete-dialog.component';

describe('ModalDeleteDialogComponent', () => {
  let component: ModalDeleteDialogComponent;
  let fixture: ComponentFixture<ModalDeleteDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalDeleteDialogComponent]
    });
    fixture = TestBed.createComponent(ModalDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
