import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';

class ManageCoursePage extends React.Component {
    constructor(props, context) {
        super(props, context);

        // local state
        // need to pass mutable state to the form ... this creates this.state
        // state (without this.) is the state from the reducer that is mapped to props
        this.state = {
            course: Object.assign({}, this.props.course),
            errors: {}
        };
    }

    // why do we need to map to local state here? could we not have uses this.props.course directly?
    // my guess is that would have sent the store state to the stateless functional component which is a bad practice
    render() {
        return (
                <CourseForm
                    allAuthors={[]}
                    course={this.state.course}
                    errors={this.state.errors}
                />
        );
    }
}

 ManageCoursePage.propTypes = {
     course: PropTypes.object.isRequired
};

// function getCourseById(courses, id) {
//     const course = courses.filter(course => course.id == id);
//     if (course) return course[0];
//     return null;
// }

// this is also the place to tranform data from API into shape/form needed for components
function mapStateToProps(state, ownProps) {
    //const courseId = ownProps.params.id;
    let course = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};
    // if (courseId && state.courses.length > 0) {
    //     course = getCourseById(state.courses, courseId);
    // }

    let authors = {id: ''};

    return {
        course: course,
        authors: authors
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);