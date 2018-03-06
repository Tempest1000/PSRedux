import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import CourseList from './CourseList';
import {browserHistory} from 'react-router';
import toastr from "toastr";
import * as courseActions from "../../actions/courseActions";
import {bindActionCreators} from "redux";

class CoursesPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
    }

    deleteCourse(id, event) {
        event.preventDefault();

        this.props.actions.deleteCourse(id)
            .catch(errorMsg => {
                toastr.error(errorMsg);
            });

        toastr.error('Course deleted');
    }

    redirectToAddCoursePage() {
        browserHistory.push('/course');
    }

    render() {
        return (
            <div>
                <h1>Courses</h1>
                <input
                    type="submit"
                    value="Add Course"
                    className="btn btn-primary"
                    onClick={this.redirectToAddCoursePage}/>
                <CourseList
                    courses={this.props.courses}
                    onDelete={this.deleteCourse}
                />
            </div>
        );
    }
}

CoursesPage.propTypes = {
    courses: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        courses: state.courses
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);