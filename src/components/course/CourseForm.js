// this is a stateless functional component (good for dumb presentation components)
// that calls child components (text input, select input, etc)
// this child components have to be created under common

import React, {PropTypes} from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

// author calls this destructing ... so don't have to use this.props.course?
const CourseForm = ({course, allAuthors, onSave, onChange, saving, errors}) => {
    return(
        <form>
            <h1>Manage Course</h1>
            <TextInput
                name="title"
                label="Title"
                value={course.title}
                onChange={onChange}
                error={errors.title}/>

            <SelectInput
                name="authorId"
                label="Author"
                value={course.authorId}
                defaultOption="Select Author"
                options={allAuthors}
                onChange={onChange}
                error={errors.authorId}/>

            <TextInput
                name="category"
                label="Category"
                value={course.category}
                onChange={onChange}
                error={errors.category}/>

            <TextInput
                name="length"
                label="Length"
                value={course.length}
                onChange={onChange}
                error={errors.length}/>

            <input
                type="submit"
                disabled={saving}
                value={saving ? "Saving..." :  "Save"}
                className="btn btn-primary"
                onClick={onSave}/>
        </form>
    );
};

CourseForm.propTypes = {
    course: React.PropTypes.object.isRequired,
    onSave: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    allAuthors: React.PropTypes.array,
    saving: React.PropTypes.bool,
    errors: React.PropTypes.object
};

export default CourseForm;