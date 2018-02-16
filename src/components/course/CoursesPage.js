import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as courseActions from '../../actions/courseActions';

class CoursesPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
          course: { title: "" }
        };

        this.onTitleChange = this.onTitleChange.bind(this);
        this.onClickSave = this.onClickSave.bind(this);
    }

    onTitleChange(event) {
        const course = this.state.course;
        course.title = event.target.value;
        this.setState({course});
    }

    onClickSave() {
        console.log("In event handler for onClickSave");
        this.props.dispatch(courseActions.createCourse(this.state.course));
    }

    courseRow(course, index) {
        return <div key={index}>{course.title}</div>;
    }

    render() {
        console.log("rendering component");
        return (
            <div>
                <h1>Courses</h1>
                {this.props.courses.map(this.courseRow)}
                <h2>Add Course</h2>
                <input type="text"
                       onChange={this.onTitleChange}
                       value={this.state.course.title} />

                <input type="submit"
                       value="Save"
                       onClick={this.onClickSave} />
            </div>
        );
    }
}

CoursesPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
    courses: PropTypes.array.isRequired
};

// This function returns the properties we'd like to see exposed on our component.
// So courses in the return would be this.props.courses
// The state argument is the state that is in the Redux store. So state.courses is the course data in the Redux store.
// This **courses** property is determined by what was added in the reducer in reducers\index.js
function mapStateToProps(state, ownProps) {
    console.log("state changed, mapping state to props");
    return {
        courses: state.courses
    };
}

export default connect(mapStateToProps)(CoursesPage);
