import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';

import { Post } from "../post.model";
import { PostsService } from "../posts.service";
import { NgForm } from '@angular/forms';

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"]
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];

  message:boolean =false;
  tab:any;

  private postsSub: Subscription;

  constructor(public postsService: PostsService) {}

  ngOnInit() {
    
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

  

  onUpdate(post: Post, form: NgForm) {
    let comments: string[] = post.comments ;
    comments.push(form.value.comment.toString());
    this.postsService.updatePost(post.id, comments);
    form.resetForm();
  }

FilterMus(){

  this.posts = this.postsService.getPostsArray();
    this.posts=this.posts.filter(res=>{
    return res.topic.toLocaleLowerCase().match("music");
    
  });
  if(this.posts.length == 0){
    this.message=true;

  }else{

 this.message = false;

}}

FilterGam(){

  this.posts = this.postsService.getPostsArray();
    this.posts=this.posts.filter(res=>{
    return res.topic.toLocaleLowerCase().match("gaming");
    
  });
  if(this.posts.length == 0){
    this.message=true;

  }else{

 this.message = false;

}}

FilterTv(){

  this.posts = this.postsService.getPostsArray();
    this.posts=this.posts.filter(res=>{
    return res.topic.toLocaleLowerCase().match("tv");
    
  });
  if(this.posts.length == 0){
    this.message=true;

  }else{

 this.message = false;

}}

FilterUni(){

  this.posts = this.postsService.getPostsArray();
    this.posts=this.posts.filter(res=>{
    return res.topic.toLocaleLowerCase().match("university");
    
  });
  if(this.posts.length == 0){
    this.message=true;

  }else{

 this.message = false;

}}

FilterMed(){

  this.posts = this.postsService.getPostsArray();
    this.posts=this.posts.filter(res=>{
    return res.topic.toLocaleLowerCase().match("media");
    
  });
  if(this.posts.length == 0){
    this.message=true;

  }else{

 this.message = false;

}}

FilterJob(){

  this.posts = this.postsService.getPostsArray();
    this.posts=this.posts.filter(res=>{
    return res.topic.toLocaleLowerCase().match("jobs");
    
  });
  if(this.posts.length == 0){
    this.message=true;

  }else{

 this.message = false;

}
}
FilterSpo(){

  this.posts = this.postsService.getPostsArray();
    this.posts=this.posts.filter(res=>{
    return res.topic.toLocaleLowerCase().match("sports & health");
    
  });
  if(this.posts.length == 0){
    this.message=true;

  }else{

 this.message = false;

}
}
FilterFas(){

  this.posts = this.postsService.getPostsArray();
    this.posts=this.posts.filter(res=>{
    return res.topic.toLocaleLowerCase().match("fashion & beauty");
    
  });
  if(this.posts.length == 0){
    this.message=true;

  }else{

 this.message = false;

}


}
}
