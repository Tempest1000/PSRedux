import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage.js';
import AboutPage from './components/about/AboutPage.js';
import CoursesPage from './components/course/CoursesPage.js';
import ManageCoursePage from './components/course/ManageCoursePage.js';
import AuthorsPage from './components/author/AuthorsPage.js';
import ManageAuthorPage from "./components/author/ManageAuthorPage";

export default (
  <Route path="/" component={App}>
      <IndexRoute component={HomePage} />
      <Route path="courses" component={CoursesPage} />
      <Route path="course" component={ManageCoursePage} />
      <Route path="course/:id" component={ManageCoursePage} />
      <Route path="authors" component={AuthorsPage} />
      <Route path="author" component={ManageAuthorPage} />
      <Route path="author/:id" component={ManageAuthorPage} />
      <Route path="about" component={AboutPage} />
  </Route>
);