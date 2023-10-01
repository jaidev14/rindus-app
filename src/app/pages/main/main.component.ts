import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalDeleteDialogComponent } from 'src/app/components/modal-delete-dialog/modal-delete-dialog.component';
import { ModalInputPostComponent } from 'src/app/components/modal-input-post/modal-input-post.component';
import { PostModel } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post/post.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  loading = false;

  search = '';
  sortKey = '';
  sortDirection = '';

  posts: PostModel[] = [];
  filteredPosts: PostModel[] = []

  modalRef: NgbModalRef;

  constructor(
    private postService: PostService,
    public userService: UserService,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.loading = true;
    this.search = '';
    this.fetchPosts().then(() => {
      this.posts.forEach(post => {
        post.userName = this.userService.getUsernameById(post.userId);
      });
      this.loading = false
    });
  }

  async fetchPosts() {
    this.posts = await this.postService.getPosts();
    this.filteredPosts = this.shuffleArray(this.posts);
  }

  shuffleArray(array: any) {
    var m = array.length, t, i;

    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  }

  filterResults() {
    if (!this.search) {
      this.filteredPosts = this.posts;
    }

    this.filteredPosts = this.posts.filter(
      post => post?.title.toLowerCase().includes(this.search.toLowerCase())
        || post?.body.toLowerCase().includes(this.search.toLowerCase())
        || post?.userName.toLowerCase().includes(this.search.toLowerCase())
    );
  }

  openPostPage(post: PostModel) {
    this.router.navigate(
      ['post', post.id],
      { state: { post } });
  }

  openDeleteDialog(post: PostModel) {
    this.modalRef = this.modalService.open(ModalDeleteDialogComponent, { centered: true });
    this.modalRef.componentInstance.isPost = true;
    this.modalRef.result.then((result) => {
      if (result) {
        this.postService.deletePost(post.id).then(() => {
          this.loadPosts();
        });
      }
    }).catch((res) => {
      console.log('modal dismissed');
    });
  }

  async openInputModal(post?: PostModel) {
    this.modalRef = this.modalService.open(ModalInputPostComponent, { size: 'lg', centered: true });
    this.modalRef.componentInstance.post = post;
    this.modalRef.result.then((result) => {
      if (result) {
        let data = new PostModel({});
        if (post === undefined || post === null) {
          data = new PostModel({
            userId: this.userService.currentUser.id,
            title: result.title,
            body: result.body,
          });
          this.postService.createPost(data).then(() => {
            this.loadPosts();
          });
        } else {
          data = new PostModel({
            id: post?.id,
            userId: this.userService.currentUser.id,
            title: result.title,
            body: result.body,
          });
          this.postService.updatePost(data);
        }
      }
    }).catch((res) => {
      console.log('modal dismissed');
    });
  }
}
