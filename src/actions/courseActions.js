import * as types from './actionTypes';

// action creator creates actions
export function createCourse(course) {
    console.log("In the action creator");
    return { type: types.CREATE_COURSE, course };
}