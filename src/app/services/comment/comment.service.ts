import { Injectable } from '@angular/core';
import { CommentModel } from '../models/comment.model';
import { ApiService } from './api/api.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private apiService: ApiService,
  ) { }

}
