import { Component, OnInit } from '@angular/core';
import { PostModel } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post/post.service';

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

  constructor(
    private postService: PostService
  ) { }
   
  ngOnInit() {
    this.loading = true;
    this.fetchPosts().then(() => this.loading = false);
  }

  async fetchPosts() {
    this.posts =  await this.postService.getPosts();
  }

  openDeleteDialog(postId: number) {
    console.log('delete');
  }

  openEditDialog(postId: number) {
    console.log('edit');
  }

}
