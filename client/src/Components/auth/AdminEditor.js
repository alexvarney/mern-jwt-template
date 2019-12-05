import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import Axios from 'axios'
import AdminEditorTable from './AdminEditorTable'

function AdminEditor(props) {

    const [users, setUsers] = useState([])

    const getUsers = () => {

        const config = {
            headers: {
                'Authorization': `Bearer ${props.auth.token}`
            }
        }

        Axios.get('/api/user', config)
            .then( res => {
                console.log(res.data);
                setUsers(res.data)
            }).catch(err => console.log(err))

    }

    useEffect( () => getUsers(), [])


    return (
        <div className="card" style={{marginTop: '1rem'}}>
            <h5 className="card-header">Admin Editor</h5>
            <div className="card-body container">

            <AdminEditorTable users={users} token={props.auth.token} updateUsers={getUsers}/>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {})(AdminEditor)