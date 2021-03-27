/*
  Author Name  : Reeturaj Chatterjee
  Author Email : chatterjeereeturaj@gmail.com
*/

import { Comment } from "../../models/Comment";
import { CommentActions } from "../../redux/actions/CommentActions";
import { CommentApi } from "./CommentApi";

export class CommentApiRepository {
  static fetchComments(postId:string) {
    return async (dispatch: any) => {
      try {
        const comments = await CommentApi.fetchComments(postId);
        if(comments && typeof comments.items !== "undefined"){
            const sortedComments = comments.items;
            sortedComments.sort((a:any,b:any)=>{
              const first = a.createdAt;
              const second = b.createdAt;
              if(new Date(second) > new Date(first)){
                return -1;
              }
              return 0;
            })
            dispatch(CommentActions.FetchCommentAction(sortedComments));
        }
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    };
  }
  static fetchCommentsCount(postId:string) {
    return async (dispatch: any) => {
      try {
        const comments = await CommentApi.fetchComments(postId);
        if(comments && typeof comments.items !== "undefined"){
            const commentsCount = comments.count;
            return Promise.resolve(commentsCount);
        }
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    };
  }
  static createComment(postId:string,commentBody:string) {
    return async (dispatch:any) => {
      try {
        const response = await CommentApi.createComment(postId,commentBody);
        dispatch(CommentActions.AddCommentAction(response));
        console.log(response);
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    }
  }
  static deleteComment(postId:string,commentData:Comment) {
    return async (dispatch:any) => {
      try {
        const response = await CommentApi.deleteComment(postId,commentData);
        dispatch(CommentActions.DeleteCommentAction(response.id));
        console.log(response);
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    }
  }
}
