import * as types from '../actions/actionTypes';

// reducer will handle list of courses
// ... is ES6 spread operator ... explodes array
export default function courseReducer(state = [], action) {
    switch (action.type) {
        case types.LOAD_COURSES_SUCCESS:
            console.log("In the create course of the course reducer");
            return action.courses;
        default:
            return state;
    }
}