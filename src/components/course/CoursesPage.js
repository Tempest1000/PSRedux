import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as courseActions from '../../actions/courseActions';
import {bindActionCreators} from 'redux';

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
        console.log("In the event handler for onClickSave");
        this.props.actions.createCourse(this.state.course);
    }

    courseRow(course, index) {
        return <div key={index}>{course.title}</div>;
    }

    render() {
        console.log("In the render component");
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
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

// This function returns the properties we'd like to see exposed on our component.
// So courses in the return would be this.props.courses
// The state argument is the state that is in the Redux store. So state.courses is the course data in the Redux store.
// This **courses** property is determined by what was added in the reducer in reducers\index.js
function mapStateToProps(state, ownProps) {
    console.log("In the mapping state to props function (state changed)");
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
