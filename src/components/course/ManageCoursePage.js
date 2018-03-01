import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import toastr from 'toastr';

class ManageCoursePage extends React.Component {
    constructor(props, context) {
        super(props, context);

        // local state
        // need to pass mutable state to the form ... this creates this.state
        // state (without this.) is the state from the reducer that is mapped to props
        this.state = {
            course: Object.assign({}, this.props.course),
            errors: {},
            saving: false
        };

        this.updateCourseState = this.updateCourseState.bind(this);
        this.saveCourse = this.saveCourse.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.course.id != nextProps.course.id) {
            // necessary to populate form when existing course is loaded directly.
            this.setState({course: Object.assign({}, nextProps.course)});
        }
    }

    // this is covered in the Flux course
    updateCourseState(event) {
        const field = event.target.name;
        let course = this.state.course;
        course[field] = event.target.value;
        return this.setState({ course: course });
    }

    courseFormIsValid() {
        let formIsValid = true;
        let errors = {};
        if(this.state.course.title.length < 5) {
            errors.title = 'Title must be at least 5 characters.';
            formIsValid = false;
        }
        this.setState({errors: errors});
        return formIsValid;
    }

    // create a function to dispatch the save course action
    saveCourse(event) {
        event.preventDefault();
        if(this.courseFormIsValid()) {
            this.setState({saving: true});
            this.props.actions.saveCourse(this.state.course)
                .then(() => this.redirectTo('courses'))
                .catch(errorMsg => {
                    toastr.error(errorMsg);
                    this.setState({saving: false});
                });
        }
    }

    redirectTo(path) {
        this.setState({saving: false});
        toastr.success('Course saved');
        this.context.router.push(path);
    }

    // why do we need to map to local state here? could we not have uses this.props.course directly?
    // my guess is that would have sent the store state to the stateless functional component which is a bad practice??
    //
    // UPDATE: now understanding more about the purpose of local state vs props ... props are read-only and cannot be manipulated
    // any changes to authors would occur in the manage authors page, so authors could be props
    //
    // A course can change here, either being updated or having a new course added ... this is why a course must be in local state
    render() {
        return (
                <CourseForm
                    allAuthors={this.props.authors}
                    onChange={this.updateCourseState}
                    onSave={this.saveCourse}
                    course={this.state.course}
                    errors={this.state.errors}
                    saving={this.state.saving}
                />
        );
    }
}

 ManageCoursePage.propTypes = {
     course: PropTypes.object.isRequired,
     authors: PropTypes.array.isRequired,
     actions: PropTypes.object.isRequired
};

// Pull in the React Router context so router is available on this.context.router
ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

function getCourseById(courses, id) {
    const course = courses.filter(course => course.id == id);
    if (course && course.length > 0) return course[0];
    return null;
}

// this is also the place to tranform data from API into shape/form needed for components
function mapStateToProps(state, ownProps) {
    const courseId = ownProps.params.id; // from the path course/:id
    let course = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};

    if (courseId && state.courses.length > 0) {
        course = getCourseById(state.courses, courseId);
    }

    const authorsFormattedForDropdown = state.authors.map(author => {
        return {
          value: author.id,
          text: author.firstName + ' ' + author.lastName
        };
    });

    return {
        course: course,
        authors: authorsFormattedForDropdown
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);