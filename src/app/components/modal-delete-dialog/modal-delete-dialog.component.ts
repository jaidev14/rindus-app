import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-delete-dialog',
  templateUrl: './modal-delete-dialog.component.html',
  styleUrls: ['./modal-delete-dialog.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ModalDeleteDialogComponent {
  @Input() public isPost: boolean;

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    console.log(this.isPost)
  }

  submit(response: boolean) {
    this.activeModal.close(response);
  }
  
  dismiss() {
    this.activeModal.close();
  }

}
