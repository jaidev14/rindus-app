import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: 'main',
  loadChildren: () => import('./pages/main/main.module')
    .then(m => m.MainModule)
}, {
  path: 'post/:id',
  loadChildren: () => import('./pages/post/post.module')
    .then(m => m.PostModule)
}, {
  path: '',
  redirectTo: 'main',
  pathMatch: 'full'
}, {
  path: '**',
  redirectTo: 'main',
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
