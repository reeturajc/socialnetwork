import { Post } from "../../models/Post";
import { Http } from "../http";

export class PostApi {
  // Fetch All Posts
  static fetchPosts() {
    return Http.get("/posts");
  }
  // Fetch Post By Id
  static fetchPost(postId: string){
    return Http.get(`/posts/${postId}`);
  }
  // Create New Post
  static createPost(postData: Post) {
    return Http.post("/posts", {...postData,createdAt : new Date(),updatedAt : new Date()});
  }
  // Update Existing Post
  static updatePost(postData: Post) {
    return Http.put(`/posts/${postData.id}`, {...postData,updatedAt : new Date()});
  }
  // Delete Post
  static deletePost(postData: Post) {
    return Http.delete(`/posts/${postData.id}`);
  }
}
