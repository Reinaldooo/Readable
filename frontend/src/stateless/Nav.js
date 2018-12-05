import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const Nav = (props) => {
    return (
        <ul className="navCustom">
            <div className="add-post">
                <li>
                    <Link to="/">
                        <i className="fa fa-book" aria-hidden="true"></i> <strong>Home</strong>
                    </Link>
                </li>
                {
                    props.categories[0] && props.categories.map((category) =>
                        <li key={category.name}>
                            <Link to={`/${category.name}`}>
                                <i className="fa fa-tag" aria-hidden="true"></i> {category.name}
                            </Link>
                        </li>
                    )
                }
            </div>
        </ul>
    )
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories
    };
};


export default connect(mapStateToProps, null)(Nav);