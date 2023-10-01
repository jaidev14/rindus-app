import { Component, Injectable, Input, OnInit } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { CommentModel } from 'src/app/models/comment.model'
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-edit-comment',
  templateUrl: './modal-edit-comment.component.html',
  styleUrls: ['./modal-edit-comment.component.scss'],
  standalone: true,
  imports: [FormsModule]
})
@Injectable()
export class ModalEditCommentComponent implements OnInit {
  @Input() public comment: CommentModel;

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    if (this.comment === undefined || this.comment === null) {
      this.comment = new CommentModel({});
    }
  }

  submit() {
    this.activeModal.close(this.comment);
  }
  
  dismiss() {
    this.activeModal.close();
  }
}