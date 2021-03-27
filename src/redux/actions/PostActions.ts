/*
  Author Name  : Reeturaj Chatterjee
  Author Email : chatterjeereeturaj@gmail.com
*/

import { Post } from "../../models/Post";

export enum PostActionTypes {
  FETCH_POST = "FETCH POST",
  ADD_POST = "ADD POST",
  UPDATE_POST = "UPDATE POST",
  DELETE_POST = "DELETE POST",
}

export class PostActions {
  static FetchPostAction = (posts: Post[]) => ({
    type: PostActionTypes.FETCH_POST,
    payload: posts,
  });
  static AddPostAction = (post: Post) => ({
    type: PostActionTypes.ADD_POST,
    payload: post,
  });
  static UpdatePostAction = (post: Post) => ({
    type: PostActionTypes.UPDATE_POST,
    payload: post,
  });
  static DeletePostAction = (id: string) => ({
    type: PostActionTypes.DELETE_POST,
    payload: id,
  });
}
