import * as types from './actionTypes';
import CourseApi from '../api/mockCourseApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadCoursesSuccess(courses) {
    return {type: types.LOAD_COURSES_SUCCESS, courses};
}

export function loadCourses() {
    return function(dispatch) {
        dispatch(beginAjaxCall());
        return CourseApi.getAllCourses()
            .then(courses => { dispatch(loadCoursesSuccess(courses)); })
            .catch(error => { throw(error); });
    };
}

export function updateCourseSuccess(course) {
    return {type: types.UPDATE_COURSE_SUCCESS, course};
}

export function createCourseSuccess(course) {
    return {type: types.CREATE_COURSE_SUCCESS, course};
}

export function deleteCourseSuccess(id) {
    let action = {type: types.DELETE_COURSE_SUCCESS, id};
    //console.log(action);
    return action;
}

export function saveCourse(course) {
    return function(dispatch) {
        dispatch(beginAjaxCall());
        return CourseApi.saveCourse(course)
            .then(savedCourse => {
                if (course.id) {
                    dispatch(updateCourseSuccess(savedCourse));
                } else {
                    dispatch(createCourseSuccess(savedCourse));
                }
            })
            .catch(error => {
                dispatch(ajaxCallError());
                throw(error);
            });
    };
}

export function deleteCourse(id) {
    return function(dispatch) {
        dispatch(beginAjaxCall());
        //console.log("in the action, id is: " + id);
        return CourseApi.deleteCourse(id)
            .then(id => { dispatch(deleteCourseSuccess(id)); })
            .catch(error => { throw(error); });
    };
}