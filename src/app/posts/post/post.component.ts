import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/authentication/auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post : Post ;
public message =true ;
public isAuth: boolean ;
  constructor(public postsService: PostsService, public authService: AuthService) {
   }

  ngOnInit(): void {
    if (this.post.comments.length == 0){
      this.message == true ;
    }
    else {this.message= false};
    this.isAuth = this.authService.getIsAuth();
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

  onUpdate(post: Post, form: NgForm) {
    let comments: string[] = post.comments;
    comments.push(form.value.comment.toString());
    this.postsService.addComment(post.id, comments);
    form.reset();
  }
}