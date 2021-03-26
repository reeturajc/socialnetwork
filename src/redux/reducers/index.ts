import {applyMiddleware,combineReducers, createStore, compose} from 'redux';
import thunk from 'redux-thunk';

export const rootReducer = combineReducers({

});

const composeEnhancers = compose;

export default createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
