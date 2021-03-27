import { Post } from "../../models/Post";
import { PostActionTypes } from "../actions/PostActions";

interface PostReducerState {
  posts: Post[];
}

const initialState: PostReducerState = {
  posts: [],
};

export const PostReducer = (state = initialState,action:any):PostReducerState => {
  switch (action.type) {
    case PostActionTypes.FETCH_POST: {
        const posts = action.payload;
        return { ...state, posts };
      }
    case PostActionTypes.ADD_POST: {
      const posts = state.posts.concat(action.payload);
      return { ...state, posts };
    }
    case PostActionTypes.UPDATE_POST: {
      const filteredItems = state.posts.filter(
        (data) => data.id !== action.payload.id
      );
      filteredItems.push(action.payload);
      return { ...state, posts: filteredItems };
    }
    case PostActionTypes.DELETE_POST: {
      const posts = state.posts;
      const filteredItems = posts.filter((data) => data.id !== action.payload);
      return { ...state, posts: filteredItems };
    }
    default: {
      return state;
    }
  }
};
