import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';
import * as authorActions from "../../actions/authorActions";
import AuthorForm from './AuthorForm';

class ManageAuthorPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        // remember we want a new instance of author
        this.state = {
            author: Object.assign({}, this.props.author),
            errors: {},
            saving: false
        };

        this.updateAuthorState = this.updateAuthorState.bind(this);
        this.saveAuthor = this.saveAuthor.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.author.id != nextProps.author.id) {
            // necessary to populate form when existing author is loaded directly.
            this.setState({author: Object.assign({}, nextProps.author)});
        }
    }

    // add this or cannot type in textboxes
    updateAuthorState(event) {
        const field = event.target.name;
        let author = this.state.author;
        author[field] = event.target.value;
        return this.setState({ author: author });
    }

    courseFormIsValid() {
        let formIsValid = true;
        let errors = {};

        if(this.state.author.firstName.length <= 0) {
            errors.title = 'First name must be populated.';
            formIsValid = false;
        }

        if(this.state.author.lastName.length <= 0) {
            errors.title = 'Last name must be populated.';
            formIsValid = false;
        }

        this.setState({errors: errors});
        return formIsValid;
    }

    // create a function to dispatch the save author action
    saveAuthor(event) {
        event.preventDefault();
        if(this.courseFormIsValid()) {

            this.setState({saving: true});
            this.props.actions.saveAuthor(this.state.author)
                .then(() => this.redirectTo('authors'))
                .catch(errorMsg => {
                    toastr.error(errorMsg);
                    this.setState({saving: false});
                });
        }
    }

    redirectTo(path) {
        this.setState({saving: false});
        toastr.success('Author saved');
        this.context.router.push(path);
    }

    render() {
        return (
            <AuthorForm
                author={this.state.author}
                onChange={this.updateAuthorState}
                onSave={this.saveAuthor}
                errors={this.state.errors}
                saving={this.state.saving}
            />
        );
    }
}

ManageAuthorPage.propTypes = {
    author: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

// Pull in the React Router context so router is available on this.context.router
ManageAuthorPage.contextTypes = {
    router: PropTypes.object
};

function getAuthorById(authors, id) {
    const author = authors.filter(author => author.id == id);
    if (author && author.length > 0) return author[0];
    return null;
}

function mapStateToProps(state, ownProps) {
    let authorId = ownProps.params.id;
    let authors = state.authors;
    let author = {id: '', firstName: '', lastName: ''};

    if (authorId && state.authors.length > 0) {
        author = getAuthorById(state.authors, authorId);
    }

    return {
      author: author
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(authorActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAuthorPage);