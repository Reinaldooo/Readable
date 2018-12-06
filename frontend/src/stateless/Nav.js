import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'


const NavCustom = styled.div`
    display: flex;
    padding: 1em 4rem 0;
    box-sizing: border-box;

    @media(max-width: 600px) {
        padding: 1em 1rem 0;
        justify-content: center;
    }

    & i {
        @media(max-width: 600px) {
            display: none;
        }
    }

    & a.logo {
        font-size: 1.2rem;
        font-family: 'Nunito', sans-serif;
    }

    & .navItems {
        padding: .5em;
        background-color: lightcoral;
        border-radius: 4px;
        display: flex;
        align-items: center;    
    }

    & li {
        margin-right: 1em;
        list-style-type: none
    }
 `


const Nav = (props) => {
    return (
        <NavCustom>
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
        </NavCustom>
    )
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories
    };
};


export default connect(mapStateToProps, null)(Nav);