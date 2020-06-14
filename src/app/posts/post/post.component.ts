import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post : Post ;

  constructor(public postsService: PostsService) { }

  ngOnInit(): void {
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
