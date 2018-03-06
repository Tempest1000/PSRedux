import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const AuthorList = ({authors}) => {
    return (
        <table className="table">
            <thead>
            <tr>
                <th>Id</th>
                <th>First Name</th>
                <th>Last Name</th>
            </tr>
            </thead>
            <tbody>
            {
                authors.map(author =>
                    <tr>
                        <td><Link to={`/author/${author.id}`}>{author.id}</Link></td>
                        <td>{author.firstName}</td>
                        <td>{author.lastName}</td>
                    </tr>
                )
            }
            </tbody>
        </table>
    );
};

AuthorList.propTypes = {
    authors: PropTypes.array.isRequired
};

export default AuthorList;