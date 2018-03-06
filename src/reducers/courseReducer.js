import * as types from '../actions/actionTypes';
import initialState from './initialState';

// reducer will handle list of courses
// ... is ES6 spread operator ... explodes array
export default function courseReducer(state = initialState.courses, action) {
    switch (action.type) {
        case types.LOAD_COURSES_SUCCESS:
            //console.log("In the create course of the course reducer");
            return action.courses;
        case types.CREATE_COURSE_SUCCESS:
            // don't want to do a push here to add a new item to array, this would mutate existing state
            // instead create a new array with existing items, plus new item
            return [
                ...state,
                Object.assign({}, action.course)
            ];
        case types.UPDATE_COURSE_SUCCESS:
            // note ... don't want to find the index of the item and change in existing array
            // instead create a new array with existing items (that are not the one being updated) and add item that represents change
            return [
                ...state.filter(course => course.id !== action.course.id),
                Object.assign({}, action.course)
            ];
        case types.DELETE_COURSE_SUCCESS:
            console.log("the id to exclude: '" + action.id + "'");
            let arr = [
                ...state.filter(course => course.id !== action.id)
            ];
            console.log(arr);
            return arr;
        default:
            return state;
    }
}