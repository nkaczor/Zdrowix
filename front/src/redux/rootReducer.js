import { combineReducers } from 'redux';
import counter from './modules/counter';
import user from './modules/user';

export default combineReducers({
  counter,
  user
});