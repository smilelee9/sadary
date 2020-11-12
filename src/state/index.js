import auth from './auth'
import { combineReducers } from 'redux';
import posts from './posts';

const rootReducer = combineReducers({
  posts,
  auth
})

export default rootReducer;