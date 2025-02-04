/*
  Author Name  : Reeturaj Chatterjee
  Author Email : chatterjeereeturaj@gmail.com
*/

import { Post } from "../../models/Post";
import { PostActions } from "../../redux/actions/PostActions";
import { PostApi } from "./PostApi";

export class PostApiRepository {
  static fetchPosts() {
    return async (dispatch: any) => {
      try {
        const posts = await PostApi.fetchPosts();
        if(posts && typeof posts.items !== "undefined"){
            dispatch(PostActions.FetchPostAction(posts.items));
        }
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    };
  }
  static fetchPost(postId:string) {
    return async (dispatch: any) => {
      try {
        const post = await PostApi.fetchPost(postId);
        if(post && typeof post !== "undefined"){
          return Promise.resolve(post);
        }
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    };
  }
  static createPost(postData:Post) {
    return async (dispatch:any) => {
      try {
        const response = await PostApi.createPost(postData);
        dispatch(PostActions.AddPostAction(response));
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    }
  }
  static updatePost(postData:Post) {
    return async (dispatch:any) => {
      try {
        const response = await PostApi.updatePost(postData);
        dispatch(PostActions.UpdatePostAction(response));
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    }
  }
  static deletePost(postData:Post) {
    return async (dispatch:any) => {
      try {
        const response = await PostApi.deletePost(postData);
        dispatch(PostActions.DeletePostAction(response.id));
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    }
  }
}
