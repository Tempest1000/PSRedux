// this is the root reducer
// this impacts how it is reference in app ... so it will be state.courses in the app
import {combineReducers} from 'redux';
import courses from './courseReducer';

const rootReducer = combineReducers({
    courses
});

export default rootReducer;