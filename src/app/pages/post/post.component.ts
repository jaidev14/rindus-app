import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalDeleteDialogComponent } from 'src/app/components/modal-delete-dialog/modal-delete-dialog.component';
import { ModalEditCommentComponent } from 'src/app/components/modal-edit-comment/modal-edit-comment.component';
import { CommentModel } from 'src/app/models/comment.model';
import { PostModel } from 'src/app/models/post.model';
import { CommentService } from 'src/app/services/comment/comment.service';
import { PostService } from 'src/app/services/post/post.service';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  loading = false;

  newComment = ''
  post: PostModel;
  comments: CommentModel[] = [];

  modalRef: NgbModalRef;


  constructor(
    private commentService: CommentService,
    private postService: PostService,
    public userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
   this.loadPostAndComments();
  }

  loadPostAndComments() {
    this.loading = true;
    const postId = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchPost(postId).then(
      () => this.fetchComments(postId).then(
        () => {
          this.comments.forEach(comment => {
            comment.name = this.userService.getUserById(comment.userId).name;
            comment.email = this.userService.getUserById(comment.userId).email;
          });
          this.loading = false;
        }));
  }

  async fetchComments(postId: number) {
    this.comments = await this.commentService.getComments(postId);
  }

  // We could avoid fetching the post, as we already have the data in main and we can inject it.
  // But in a real world, we wouldn't have all the post data already in the list (as it would be less efficient), so we make a call to retrieve the specific post.
  async fetchPost(postId: number) {
    this.post = await this.postService.getPost(postId);
    this.post.username = this.userService.getUserById(this.post.userId).name;
  }

  backToMain() {
    this.router.navigate(['main']);
  }

  publishComment() {
    if (this.newComment !== '') {
      const data = new CommentModel({
        postId: this.post.id,
        userId: this.userService.currentUser.id,
        body: this.newComment
      });
      this.commentService.createComment(data).then(() => {
        this.newComment = '';
        this.loadPostAndComments();
      });
    }
  }

  deleteComment(comment: CommentModel) {
    this.modalRef = this.modalService.open(ModalDeleteDialogComponent, { centered: true });
    this.modalRef.componentInstance.isPost = false;
    this.modalRef.result.then((result) => {
      if (result) {
        this.commentService.deleteComment(comment.id).then(() => {
          this.loadPostAndComments();
        });
      }
    }).catch((res) => {
      console.log('modal dismissed');
    });
  }

  editComment(comment: CommentModel) {
    this.modalRef = this.modalService.open(ModalEditCommentComponent, { size: 'lg', centered: true });
    this.modalRef.componentInstance.comment = comment;
    this.modalRef.result.then((result) => {
      if (result) {
          const data = new CommentModel({
            id: comment.id,
            userId: this.userService.currentUser.id,
            postId: this.post.id,
            body: result.body,
          });
          this.commentService.updateComment(data);
      }
    }).catch((res) => {
      console.log('modal dismissed');
    });
  }

}
