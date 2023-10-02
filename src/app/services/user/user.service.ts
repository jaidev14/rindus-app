import { Injectable } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: UserModel;
  users: UserModel[] = [];

  constructor(
    private apiService: ApiService
  ) { }

  getUserById(idVal: number) {
    const matchedUser = this.users.filter((user) => user.id == idVal);
    return matchedUser[0];
  }

  async setupUsers(params: any = {}): Promise<any> {
      const path = '/users/';
      const response: any = await this.apiService.get(path, {params});
      this.users = response.map((post: UserModel) => new UserModel(post));
      this.currentUser = this.users[localStorage.getItem('userId') ?  Number(localStorage.getItem('userId')) : 0];
  }

  selectUser(userId: number) {
    const matchedUser = this.users.filter((user) => user.id == userId);
    this.currentUser = matchedUser[0];
    localStorage.setItem('userId', this.currentUser.id.toString());
  }
}
