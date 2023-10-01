import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PostModel } from 'src/app/models/post.model';

@Component({
  selector: 'app-modal-delete-post',
  templateUrl: './modal-delete-post.component.html',
  styleUrls: ['./modal-delete-post.component.scss'],
  standalone: true
})
export class ModalDeletePostComponent {
  @Input() public post: PostModel;

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    if (this.post === undefined || this.post === null) {
      this.post = new PostModel({});
    }
  }

  submit(response: boolean) {
    this.activeModal.close(response);
  }
  
  dismiss() {
    this.activeModal.close();
  }

}
