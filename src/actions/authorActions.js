import * as types from './actionTypes';
import AuthorApi from '../api/mockAuthorApi';
import {ajaxCallError, beginAjaxCall} from './ajaxStatusActions';
import {createCourseSuccess, updateCourseSuccess} from "./courseActions";
import CourseApi from "../api/mockCourseApi";

export function loadAuthorsSuccess(authors) {
    return { type: types.LOAD_AUTHORS_SUCCESS, authors };
}

export function loadAuthors() {
    return function(dispatch) {
        dispatch(beginAjaxCall());
        return AuthorApi.getAllAuthors()
            .then(authors => { dispatch(loadAuthorsSuccess(authors)); })
            .catch(error => { throw(error); });
    };
}

export function updateAuthorSuccess(author) {
    return {type: types.UPDATE_AUTHOR_SUCCESS, author};
}

export function createAuthorSuccess(author) {
    return {type: types.CREATE_AUTHOR_SUCCESS, author};
}

export function saveAuthor(author) {
    return function(dispatch) {
        dispatch(beginAjaxCall());
        return AuthorApi.saveAuthor(author)
            .then(savedAuthor => {
                if (author.id) {
                    dispatch(updateAuthorSuccess(savedAuthor));
                } else {
                    dispatch(createAuthorSuccess(savedAuthor));
                }
            })
            .catch(error => {
                dispatch(ajaxCallError());
                throw(error);
            });
    };
}