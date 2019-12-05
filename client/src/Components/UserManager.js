import React from 'react'
import {connect} from 'react-redux'
import LoginForm from './auth/LoginForm'
import UserProfile from './auth/UserProfile'
import AdminEditor from './auth/AdminEditor'


function UserManager(props) {
    return (
        <div>
            {!props.auth.loggedIn && 
                <LoginForm />}

            {props.auth.loggedIn && <> 
                <UserProfile /> 

                {props.auth.user.role === 'admin' && <> 

                    <AdminEditor />
                
                </>}

            </>}
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(mapStateToProps, {})(UserManager)