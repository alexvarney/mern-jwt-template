import React from 'react'
import TableRow from './_tableRow';

export default function AdminEditorTable(props) {

    const {users, updateUsers} = props;


    return (
        <div className="table-resposive">
        <table className="table table-striped">
            <thead className="thead-dark">
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Password</th>
                    <th scope="col">Save</th>
                </tr>
            </thead>
            <tbody>
                {(users).map(user => 
                    <TableRow key={user._id} user={user} />
                )}
            </tbody>
        </table>
        <table className="table table-striped">
            <thead className="thead-light">
                <tr>
                    <th colSpan={5}>
                        Add New User
                    </th>
                </tr>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Password</th>
                    <th scope="col">Save</th>
                </tr>
            </thead>
            <tbody>
                <TableRow createNew={true} onUpdate={updateUsers} user={{}} />
            </tbody>
        </table>
        </div>
    )
}
