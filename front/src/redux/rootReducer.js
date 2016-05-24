import { combineReducers } from 'redux';
import counter from './modules/counter';
import user from './modules/user';
import specialty from './modules/specialty';
import doctor from './modules/doctor';
import workingTime from './modules/workingTime';
import visit from './modules/visit';
import question from './modules/question';

export default combineReducers({
  counter,
  user,
  specialty,
  doctor,
  workingTime,
  visit,
  question
});