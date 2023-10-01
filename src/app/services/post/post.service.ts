import { Injectable } from '@angular/core';
import { PostModel } from '../../models/post.model';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private apiService: ApiService,
  ) { }

  async getPosts(params: any = {}): Promise<any> {
    const path = '/posts/';
    const response: any = await this.apiService.get(path, {params});
    return response.map((post: PostModel) => new PostModel(post));
  }

  async getPost(id: number): Promise<PostModel> {
    const path = `/posts/${id}/`;
    const response: any = await this.apiService.get(path);
    return new PostModel(response);
  }

  async createPost(data: PostModel): Promise<boolean> {
    const path = `/posts/`;
    const response: any = await this.apiService.post(path, data);
    return true;
  }

  async updatePost(data: PostModel): Promise<PostModel> {
    const path = `/posts/${data.id}/`;
    const response: any = await this.apiService.put(path);
    return new PostModel(response);
  }

  async deletePost(id: number): Promise<PostModel> {
    const path = `/posts/${id}/`;
    const response: any = await this.apiService.delete(path);
    return new PostModel(response);
  }

  async getUserOfPost(id: number) {
    
  }
}
