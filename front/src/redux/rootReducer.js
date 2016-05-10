import { combineReducers } from 'redux';
import counter from './modules/counter';
import user from './modules/user';
import specialty from './modules/specialty';

export default combineReducers({
  counter,
  user,
  specialty
});