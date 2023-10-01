import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { CommentModel } from 'src/app/models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private apiService: ApiService,
  ) { }

  async getComments(postId: Number): Promise<any> {
    const path = `/comments?postId=${postId}`;
    const response: any = await this.apiService.get(path);
    return response.map((comment: CommentModel) => new CommentModel(comment));
  }

  async getComment(id: number): Promise<CommentModel> {
    const path = `/comments/${id}/`;
    const response: any = await this.apiService.get(path);
    return new CommentModel(response);
  }

  async createComment(data: CommentModel): Promise<boolean> {
    const path = `/comments/`;
    const response: any = await this.apiService.post(path, data);
    return true;
  }

  async updateComment(data: CommentModel): Promise<CommentModel> {
    const path = `/comments/${data.id}/`;
    const response: any = await this.apiService.put(path);
    return new CommentModel(response);
  }

  async deleteComment(id: number): Promise<CommentModel> {
    const path = `/comments/${id}/`;
    const response: any = await this.apiService.delete(path);
    return new CommentModel(response);
  }

}
