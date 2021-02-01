import { combineReducers } from 'redux';
import postsReducer from './postsReducer';
import usersReducer from './usersReduser';

export default combineReducers({
  posts: postsReducer,
  users: usersReducer
});