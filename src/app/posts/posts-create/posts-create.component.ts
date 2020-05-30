import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { PostsService } from "../posts.service";
import { Post } from "../post.model";

@Component({
  selector: "app-post-create",
  templateUrl: "./posts-create.component.html",
  styleUrls: ["./posts-create.component.css"],
})
export class PostsCreateComponent implements OnInit {
  enteredTitle = "";
  enteredContent = "";
  post: Post;
  isLoading = false;
  private mode = "create";
  private postId: string;

  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("postId")) {
        this.mode = "edit";
        this.postId = paramMap.get("postId");
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe((postData) => {
          this.isLoading = false;
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
            topic: postData.topic,
            publisher: postData.publisher,
            comments: postData.comments,
          };
        });
      } else {
        this.mode = "create";
        this.postId = null;
      }
    });
  }

  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === "create") {
      this.postsService.addPost(
        form.value.title,
        form.value.topic,
        form.value.content
      );
    } else {
      let post: Post = {
        id: this.post.id,
        title: form.value.title,
        content: form.value.content,
        topic: form.value.topic,
        publisher: {
          name: this.post.publisher.name,
          id: this.post.publisher.id,
        },
        comments: this.post.comments,
      };
      this.postsService.updatePost(post);
    }
    form.resetForm();
  }
}
