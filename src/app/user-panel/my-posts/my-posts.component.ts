import { Component, OnInit } from "@angular/core";
import { Post } from "src/app/posts/post.model";
import { Subscription } from "rxjs";
import { PostsService } from "src/app/posts/posts.service";
import { AuthService } from "src/app/authentication/auth.service";

@Component({
  selector: "app-my-posts",
  templateUrl: "./my-posts.component.html",
  styleUrls: ["./my-posts.component.css"],
})
export class MyPostsComponent implements OnInit {
  posts: Post[] = [];
  userId: string;
  private postsSub: Subscription;
  message: boolean = false;

  constructor(
    public postsService: PostsService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.postsService.getPosts();
    this.userId = this.authService.getUserID();
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts.filter(post => post.publisher.id === this.userId);
        if (this.posts.length == 0) {
          this.message = true;
        }
        else {this.message = false;}
      });
 
  }
}
