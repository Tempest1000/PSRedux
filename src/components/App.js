// This component handles the App template used on every page.
import React, {PropTypes} from 'react';
import Header from './common/Header.js';
import {connect} from 'react-redux';

class App extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <Header
                    loading={this.props.loading}
                    coursesCount={this.props.coursesCount}
                    authorsCount={this.props.authorsCount}
                />
                {this.props.children}
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    coursesCount: PropTypes.number.isRequired,
    authorsCount: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
    console.log("numAjaxCallsInProgress: " + state.numAjaxCallsInProgress);
    return {
        loading: state.numAjaxCallsInProgress > 0,
        coursesCount: state.courses.length,
        authorsCount: state.authors.length
    };
}

export default connect(mapStateToProps)(App);
