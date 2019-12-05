import React from "react";
import { connect } from "react-redux";
import {logout} from '../Store/Actions/auth'

function Header(props) {
  return (
    <nav className="navbar navbar-light bg-light">
      <span className="navbar-brand mb-0 h1">React JWT Starter Project</span>

    {props.auth.loggedIn && props.auth.user && 
        <div className="userInfo">
            {props.auth.user.name}
            <a style={{marginLeft: '1rem'}} href='#' onClick={()=>props.logout(props.auth.token)}>Logout</a>
        </div>}
    
    </nav>
  );
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {logout})(Header);
