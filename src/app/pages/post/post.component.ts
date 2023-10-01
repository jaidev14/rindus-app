import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  search = '';
  sortKey = '';
  sortDirection = '';

  post: PostModel;
  comments: CommentModel[] = [];

  constructor(
    private commentService: CommentService,
    private postService: PostService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loading = true;
    const postId = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchPost(postId).then(
      () => this.fetchComments(postId).then(
        () => this.loading = false)
      )
  }

  async fetchComments(postId: number) {
    this.comments = await this.commentService.getComments(postId);
  }

    // We could avoid fetching the post, as we already have the data in main and we can inject it.
    // But in a real world, we wouldn't have all the post data already in the list (as it would be less efficient), so we make a call to retrieve the specific post.
  async fetchPost(postId: number) {
    this.post = await this.postService.getPost(postId);
    this.post.userName = this.userService.getUsernameById(this.post.userId);
  }

  backToMain() {
    this.router.navigate(['main']);
  }
}
