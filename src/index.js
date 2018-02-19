// the configureStore code updates the apps entry point to work with redux
/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import './styles/styles.css'; //Webpack can import CSS files too!
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { loadCourses } from './actions/courseActions';

// create an instance of the redux store
// could pass initial state to the store as an argument here
// currently the reducers set the initial state
const store = configureStore();

store.dispatch(loadCourses());

// Provider is higher order component that attaches our store to our React container components

render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('app')
);