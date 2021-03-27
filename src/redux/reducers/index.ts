import {applyMiddleware,combineReducers, createStore, compose} from 'redux';
import thunk from 'redux-thunk';
import { CommentReducer } from './CommentReducer';
import { PostReducer } from './PostReducer';

export const rootReducer = combineReducers({
    postReducer: PostReducer,
    commentReducer: CommentReducer
});

const composeEnhancers = compose;

export default createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
