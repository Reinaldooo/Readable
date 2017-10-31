import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Nav extends Component {
    render() {
    return (
        <ul className="navCustom">
            <div className="add-post">
            <li>
                <Link to="/">
                   <i className="fa fa-book" aria-hidden="true"></i> <strong>Home</strong>
                </Link>
            </li>            
            </div>            
        </ul>
    )
} 
}

const mapStateToProps = (state) => {
    return {
        categories:                state.categories
    };
  };
 
  
  export default connect(mapStateToProps, null)(Nav);