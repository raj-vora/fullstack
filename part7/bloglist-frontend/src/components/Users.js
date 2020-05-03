import React, { useEffect, useState } from 'react'
import userService from '../services/userService'

const Users = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        async function temp(){
            const users = await userService.getAll()
            setUsers(users)
            console.log(users)
        }  
        temp()
    },[])


    return(
        <div>
            <h2>Users</h2>
            <table>
                <tbody>
                    <tr>
                        <th> </th>
                        <th>blogs created</th>
                    </tr>
                    {users.map(user =>
                        <tr>
                            <td>{user.name}</td>
                            <td>{user.blogs.length}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Users