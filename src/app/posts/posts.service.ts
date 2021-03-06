import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { Post } from "./post.model";
import { AuthService } from '../authentication/auth.service';

@Injectable({ providedIn: "root" })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router,public authService: AuthService) {}

  getPosts() {
    this.http
      .get<{ message: string; posts: any }>("http://localhost:3000/api/posts")
      .pipe(
        map(postData => {
          return postData.posts.map(post => {
            return {
              title: post.title,
              topic: post.topic,
              publisher: post.publisher,
              content: post.content,
              id: post._id,
              comments:post.comments,
              date:new Date(post.date).toString()
            };
          });
        })
      )
      .subscribe(transformedPosts => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    return this.http.get<{ _id: string; title: string; content: string; topic:string; publisher: {name : string, id : string};comments:string[];date:string  }>(
      "http://localhost:3000/api/posts/" + id
    );
  }

  addPost(title: string, topic: string , content:string) {
    const post: Post = { id: null, title: title, topic: topic, publisher:{ name:this.authService.getUsername(),id:this.authService.getUserID()}, content: content, comments: [],date:null };
    this.http
      .post<{ message: string; postId: string }>(
        "http://localhost:3000/api/posts",
        post
      )
      .subscribe(responseData => {
        const id = responseData.postId;
        post.id = id;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(["/"]);
      });
  }

  addComment(id: string, comments: string[]) {
    this.http
      .put<{ message: string}>("http://localhost:3000/api/posts/" + id, {comments: comments})
      .subscribe(response => {
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex(p => p.id === id);
        updatedPosts[oldPostIndex].comments = comments ;
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
        console.log(response);
        this.router.navigate(["/posts"]);
      });
  }

  updatePost(post: Post) {
    this.http
      .patch("http://localhost:3000/api/posts/" + post.id, post)
      .subscribe(response => {
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(["/posts"]);
      });
  }

  deletePost(postId: string) {
    this.http
      .delete("http://localhost:3000/api/posts/" + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(["/posts"]);
      });
  }
  getPostsArray(){
    return this.posts ;
  }
}
