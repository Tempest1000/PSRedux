// this is a stateless functional component
import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import LoadingDots from "./LoadingDots";

const Header = ({ loading, authorsCount, coursesCount }) => {
    return (
        <nav>
            <IndexLink to="/" activeClassName="active">Home</IndexLink>
            {" | "}
            {loading ? <Link to="/courses" activeClassName="active">Courses</Link> : <Link to="/courses" activeClassName="active">Courses ({coursesCount})</Link>}
            {" | "}
            {loading ? <Link to="/authors" activeClassName="active">Authors</Link> : <Link to="/authors" activeClassName="active">Authors ({authorsCount})</Link>}
            {" | "}
            <Link to="/products" activeClassName="active">Products</Link>
            {" | "}
            <Link to="/about" activeClassName="active">About</Link>
            {/*{{loading && <LoadingDots interval={100} dots={20}/>}}*/}
        </nav>
    );
};

Header.propTypes = {
    loading: PropTypes.bool.isRequired
};

export default Header;
