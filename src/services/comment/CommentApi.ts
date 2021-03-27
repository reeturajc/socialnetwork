import { Comment } from "../../models/Comment";
import { Http } from "../http";

export class CommentApi {
  // Fetch All Comments
  static fetchComments(postId:string) {
    return Http.get(`/posts/${postId}/comments`);
  }
  // Create New Comment
  static createComment(postId:string,commentBody: string) {
    return Http.post(`/posts/${postId}/comments`,{commentBody,createdAt:new Date(),updatedAt:new Date()});
  }
  // Delete Comment
  static deleteComment(postId:string,commentData: Comment) {
    return Http.delete(`/posts/${postId}/comments/${commentData.id}`);
  }
}
