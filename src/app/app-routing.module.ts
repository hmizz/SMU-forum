import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BodyComponent } from './body/body.component';
import { LoginComponent } from './authentication/login/login.component';
import { PostsCreateComponent } from './posts/posts-create/posts-create.component';
import { PostListComponent } from './posts/post-list/post-list.component';


 const routes: Routes = [
  { path: '', component: BodyComponent, },
  { path: 'login', component: LoginComponent, },
  {path : 'create', component: PostsCreateComponent},
  {path : 'posts', component: PostListComponent}  
 ];

 @NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
