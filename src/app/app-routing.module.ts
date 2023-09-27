import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: 'posts',
  loadChildren: () => import('./pages/posts/posts.module')
    .then(m => m.PostsModule)
}, {
  path: '',
  redirectTo: 'posts',
  pathMatch: 'full'
}, {
  path: '**',
  redirectTo: 'posts',
  pathMatch: 'full'
}];

@NgModule({
  imports: [
  RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class AppRoutingModule { }
