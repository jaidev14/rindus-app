import { Component } from '@angular/core';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loading = false;

  constructor(
    public userService: UserService,
  ) {}

  ngOnInit() {
    this.loading = true;
    this.userService.setupUsers().then(() => this.loading = false);
  }
}
