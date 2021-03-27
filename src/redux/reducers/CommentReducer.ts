import { Comment } from "../../models/Comment";
import { CommentActionTypes } from "../actions/CommentActions";

interface CommentReducerState {
  comments: Comment[];
}

const initialState: CommentReducerState = {
  comments: [],
};

export const CommentReducer = (state = initialState,action:any):CommentReducerState => {
  switch (action.type) {
    case CommentActionTypes.FETCH_COMMENTS: {
        const comments = action.payload;
        return { ...state, comments };
      }
    case CommentActionTypes.ADD_COMMENT: {
      const comments = state.comments.concat(action.payload);
      return { ...state, comments };
    }
    case CommentActionTypes.DELETE_COMMENT: {
      const comments = state.comments;
      const filteredItems = comments.filter((data) => data.id !== action.payload);
      return { ...state, comments: filteredItems };
    }
    default: {
      return state;
    }
  }
};
