import { Post } from "../../models/Post";
import { Http } from "../http";

export class PostApi {
  // Fetch All Posts
  static fetchPosts() {
    return Http.get("/posts");
  }
  // Create New Post
  static createPost(postData: Post) {
    return Http.post("/posts", postData);
  }
  // Update Existing Post
  static updatePost(postData: Post) {
    return Http.put(`/posts/${postData.id}`, postData);
  }
  // Delete Post
  static deletePost(postData: Post) {
    return Http.delete(`/posts/${postData.id}`);
  }
}
