import React, { useState } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import UserEdit from "./UserEdit";

function UserProfile(props) {
  const [showEditForm, setEditForm] = useState(false);
  const toggleEditForm = () => {
    setEditForm(!showEditForm);
  };

  const { user } = props.auth;

  return (
    <div className="card" style={{ marginTop: "1rem" }}>
      <h5
        className={classnames({
          "card-header": true,
          "bg-warning": showEditForm,
          "text-dark": showEditForm
        })}
      >
        {showEditForm ? "Edit " : ""}User Profile
      </h5>

      {showEditForm ? (
        <UserEdit onClose={() => setEditForm(false)} />
      ) : (
        <div className="card-body container">
          <h5 className="card-title">{user.name}</h5>
          <p className="card-text text-muted">{user.role}</p>
          <p className="card-text">{user.email}</p>
          <button
            href="#"
            onClick={toggleEditForm}
            className="btn btn-secondary"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {})(UserProfile);
