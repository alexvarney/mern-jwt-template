import React, { useState } from "react";
import { connect } from "react-redux";
import {updateUser} from '../../Store/Actions/auth'

function UserEdit(props) {

    const [values, setValues] = useState({
        name: props.auth.user.name,
        email: props.auth.user.email,
    })

    const [newPassword, setNewPassword] = useState('');

    const onFormUpdate = event => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        })
    }

  const onSubmit = e => {
    e.preventDefault();

    const updatedUser = {
        ...values,
    }

    if(newPassword.length > 0){
        updatedUser.password = newPassword
    }

    props.updateUser(props.auth.token, updatedUser)

  };

  return (
    <form className="container" onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="userEditNameInput">Name</label>
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={onFormUpdate}
          className="form-control"
          id="userEditNameInput"
          aria-describedby="emailHelp"
        />
      </div>
      <div className="form-group">
        <label htmlFor="userEditEmailInput">Email</label>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={onFormUpdate}
          className="form-control"
          id="userEditEmailInput"
        />
      </div>
    <div className="form-group">
        <label htmlFor="userEditPasswordInput">New Password</label>
        <input
          type="text"
          name="password"
          value={newPassword}
          onChange={(e)=>setNewPassword(e.target.value)}
          className="form-control"
          id="userEditPasswordInput"
        />
      </div>
      <button className="btn btn-primary" type="submit">Submit</button>
      <button className="btn btn-secondary" onClick={props.onClose} type="button">Exit</button>
    </form>
  );
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {updateUser})(UserEdit);
