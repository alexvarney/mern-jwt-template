import React, {useState} from 'react'
import TextInputToggle from './_textInputToggle'
import axios from 'axios'
import { connect } from 'react-redux';

function TableRow({auth, user, createNew=false, onUpdate=null}) {

    const [hasChanged, setHasChanged] = useState(false);

    const [userValues, _setUserValues] = useState({
        name: createNew ? 'New User' : user.name,
        email: createNew ? 'user@example.com' : user.email,
        role: createNew ? 'user' : user.role
    })

    const [newPassword, _setNewPassword] = useState('')
    const setNewPassword = e => {
        if(!hasChanged){
            setHasChanged(true)
        }
        _setNewPassword(e.target.value)
    }

    const setUserValues = event => {
        if(!hasChanged){
            setHasChanged(true)
        }
        _setUserValues({...userValues, [event.target.name]: event.target.value})
    }

    const makeUpdateRequest = () => {

        const updatedUser = newPassword.length > 0 ? {
            ...user,
            ...userValues,
            password: newPassword
        } : {
            ...user,
            ...userValues
        }

        const config = {
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        }

        if (createNew){
            axios.post(`/api/user/`, updatedUser, config)
                .then(res => {
                    if(onUpdate){
                        onUpdate()
                    }
                    setHasChanged(false)
                    _setUserValues({
                        name: 'New User',
                        email: 'user@example.com',
                        role: 'user'
                    })
                    _setNewPassword('')
                })
                .catch(err => console.log(err))
        } else {

            axios.put(`/api/user/${updatedUser._id}`, updatedUser, config)
                .then(res => {
                    if(onUpdate){
                        onUpdate()
                    }
                    setHasChanged(false)
                })
                .catch(err => console.log(err))
            }
        
    }

    let mask = "Change"

    if (createNew && newPassword === ''){
        mask = "Set"
    }

    return (
        <tr key={user._id}>
            <td><TextInputToggle value={userValues.name} name="name" onChange={setUserValues} /></td>
            <td><TextInputToggle value={userValues.email} name="email" onChange={setUserValues} /></td>
            <td><TextInputToggle value={userValues.role} name="role"  onChange={setUserValues} /></td>
            <td><TextInputToggle value={newPassword} type="password" mask={mask} onChange={setNewPassword} /></td>
            <td>{hasChanged && <button onClick={makeUpdateRequest} className="btn btn-sm btn-secondary">Save</button>}</td>
        </tr>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, {})(TableRow)