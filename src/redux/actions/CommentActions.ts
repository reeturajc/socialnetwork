import { Comment } from "../../models/Comment";

export enum CommentActionTypes {
  FETCH_COMMENTS = "FETCH COMMENTS",
  ADD_COMMENT = "ADD COMMENT",
  DELETE_COMMENT = "DELETE COMMENT",
}

export class CommentActions {
  static FetchCommentAction = (comments: Comment[]) => ({
    type: CommentActionTypes.FETCH_COMMENTS,
    payload: comments,
  });
  static AddCommentAction = (comment: Comment) => ({
    type: CommentActionTypes.ADD_COMMENT,
    payload: comment,
  });
  static DeleteCommentAction = (id: string) => ({
    type: CommentActionTypes.DELETE_COMMENT,
    payload: id,
  });
}
