import { Component, OnInit } from '@angular/core';
import { PostModel } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  
  loading = false;
  
  search = '';
  sortKey = '';
  sortDirection = '';
  
  posts: PostModel[] = [];

  constructor(
    private postService: PostService
  ) { }
   
  ngOnInit() {
    this.fetchPosts();
  }

  async fetchPosts() {
    if (this.loading) {

    }
    this.posts =  await this.postService.getPosts();
  }

}
