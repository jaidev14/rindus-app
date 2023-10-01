import { Component, Injectable, Input, OnInit } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { PostModel } from 'src/app/models/post.model'
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-input-post',
  templateUrl: './modal-input-post.component.html',
  styleUrls: ['./modal-input-post.component.scss'],
  standalone: true,
  imports: [FormsModule]
})
@Injectable()
export class ModalInputPostComponent implements OnInit {
  @Input() public post: PostModel;

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    if (this.post === undefined || this.post === null) {
      this.post = new PostModel({});
    }
  }

  submit() {
    this.activeModal.close(this.post);
  }
  
  dismiss() {
    this.activeModal.close();
  }
}