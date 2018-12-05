import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const Nav = (props) => {
    return (
        <div className="navCustom">
            <div className="navItems">
                <li>
                    <Link to="/" className="logo">
                        <i className="fa fa-book" aria-hidden="true"></i> <strong>Readable</strong>
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
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories
    };
};


export default connect(mapStateToProps, null)(Nav);