import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { Post } from "../post.model";
import { PostsService } from "../posts.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"],
})
export class PostListComponent implements OnInit {
  filter = { Music: true, Gaming: true, TV: true };
  posts: Post[] = [];
  postId: string ;
  createdOn:string
  message: boolean = false;
  tab: any;
  title:string;
  private postsSub: Subscription;

  constructor(public postsService: PostsService) {}

  ngOnInit() {
    this.postsService.getPosts();
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
      this.message= false ;
  }

  search(){
    if(this.title !=""){ 
      this.posts=this.posts.filter(res=>{
      return res.title.toLocaleLowerCase().match(this.title.toLocaleLowerCase());
    });

    }else if (this.title==""){
      this.ngOnInit();
    }
  }
  
  FilterMov() {
    this.posts = this.postsService.getPostsArray();
    this.posts = this.posts.filter((res) => {
      return res.topic.toLocaleLowerCase().match("movies");
    });
    if (this.posts.length == 0) {
      this.message = true;
    } else {
      this.message = false;
    }
  }

  FilterMus() {
    this.posts = this.postsService.getPostsArray();
    this.posts = this.posts.filter((res) => {
      return res.topic.toLocaleLowerCase().match("music");
    });
    if (this.posts.length == 0) {
      this.message = true;
    } else {
      this.message = false;
    }
  }

  FilterGam() {
    this.posts = this.postsService.getPostsArray();
    this.posts = this.posts.filter((res) => {
      return res.topic.toLocaleLowerCase().match("gaming");
    });
    if (this.posts.length == 0) {
      this.message = true;
    } else {
      this.message = false;
    }
  }

  FilterTv() {
    this.posts = this.postsService.getPostsArray();
    this.posts = this.posts.filter((res) => {
      return res.topic.toLocaleLowerCase().match("tv");
    });
    if (this.posts.length == 0) {
      this.message = true;
    } else {
      this.message = false;
    }
  }

  FilterUni() {
    this.posts = this.postsService.getPostsArray();
    this.posts = this.posts.filter((res) => {
      return res.topic.toLocaleLowerCase().match("university");
    });
    if (this.posts.length == 0) {
      this.message = true;
    } else {
      this.message = false;
    }
  }

  FilterMed() {
    this.posts = this.postsService.getPostsArray();
    this.posts = this.posts.filter((res) => {
      return res.topic.toLocaleLowerCase().match("media");
    });
    if (this.posts.length == 0) {
      this.message = true;
    } else {
      this.message = false;
    }
  }

  FilterJob() {
    this.posts = this.postsService.getPostsArray();
    this.posts = this.posts.filter((res) => {
      return res.topic.toLocaleLowerCase().match("jobs");
    });
    if (this.posts.length == 0) {
      this.message = true;
    } else {
      this.message = false;
    }
  }
  FilterSpo() {
    this.posts = this.postsService.getPostsArray();
    this.posts = this.posts.filter((res) => {
      return res.topic.toLocaleLowerCase().match("sports & health");
    });
    if (this.posts.length == 0) {
      this.message = true;
    } else {
      this.message = false;
    }
  }
  FilterFas() {
    this.posts = this.postsService.getPostsArray();
    this.posts = this.posts.filter((res) => {
      return res.topic.toLocaleLowerCase().match("fashion & beauty");
    });
    if (this.posts.length == 0) {
      this.message = true;
    } else {
      this.message = false;
    }
  }
}