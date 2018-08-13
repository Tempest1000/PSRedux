// this is the root reducer
// this impacts how it is reference in app ... so it will be state.courses in the app
import {combineReducers} from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';
import products from './productReducer';
import numAjaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
    courses,
    authors,
    products,
    numAjaxCallsInProgress
});

export default rootReducer;