import * as types from '../actions/actionTypes';
import initialState from './initialState';

// remember that every time an action is fired all reducers all called
// because of this the following code can be used to check to see if that resulted in success
function actionTypeEndsInSuccess(type) {
    return type.substring(type.length - 8) == '_SUCCESS';
}

export default function ajaxStatusReducer(state= initialState.numAjaxCallsInProgress, action) {
    if(action.type === types.BEGIN_AJAX_CALL) {
        return state + 1;
    } else if (action.type === types.AJAX_CALL_ERROR || actionTypeEndsInSuccess(action.type)) {
        return state - 1;
    }
    return state;
}