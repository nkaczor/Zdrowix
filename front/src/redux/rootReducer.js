import { combineReducers } from 'redux';
import counter from './modules/counter';
import user from './modules/user';
import specialty from './modules/specialty';
import doctor from './modules/doctor';
export default combineReducers({
  counter,
  user,
  specialty,
  doctor
});