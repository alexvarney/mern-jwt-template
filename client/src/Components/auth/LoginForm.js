import React, { useRef } from "react";
import { connect } from "react-redux";
import { login } from "../../Store/Actions/auth";

function LoginForm(props) {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const onSubmit = e => {
    e.preventDefault();

    props.login({
      email: emailRef.current.value,
      password: passwordRef.current.value
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email</label>
        <input
          type="email"
          ref={emailRef}
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input
          type="password"
          ref={passwordRef}
          className="form-control"
          id="exampleInputPassword1"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {props.auth.loggingIn ? (
          <div
            className="spinner-border spinner-border-sm text-light"
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          "Submit"
        )}
      </button>
    </form>
  );
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { login })(LoginForm);
