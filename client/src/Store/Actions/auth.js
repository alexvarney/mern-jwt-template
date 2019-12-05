import axios from "axios";
import actionTypes from "./actionTypes";

export const login = ({ email, password }) => dispatch => {
  dispatch({ type: actionTypes.auth.beginLogin });

  axios
    .post("/api/user/login", {
      email,
      password
    })
    .then(res => {
      localStorage.setItem("jwtToken", res.data.token);
      dispatch({ type: actionTypes.auth.loginSuccess, payload: res.data });
    })
    .catch(err => dispatch({ type: actionTypes.auth.loginFailure }));
};

export const logout = token => dispatch => {
    localStorage.removeItem('jwtToken')
    console.log(token)
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    axios.post('/api/user/me/logout', {}, config)
        .then(res => {
            dispatch({type: actionTypes.auth.logout})
        })

}

export const loginWithToken = (token) => dispatch => {

    if(token) {
      const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    axios.get('/api/user/me', config)
      .then(res => {
        dispatch({type: actionTypes.auth.loginSuccess, payload: {token, user: res.data}})
      }).catch(err=>dispatch({type: actionTypes.auth.loginFailure}))

    }

}

export const updateUser = (token, user) => dispatch => {
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    axios.put('/api/user/me', user, config)
        .then(res => {
            dispatch({type: actionTypes.auth.updateUser, payload: res.data})
        })
  
}