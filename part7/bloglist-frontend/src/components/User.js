import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const User = () => {
    
    const users = useSelector(state => state.users)
    const id = useParams().id
    const user = users.find(user => user.id === id)
    if(!user){
        return null
    }
    const blogs = user.blogs

    return(
        <div>
            <h2>{user.name}</h2>
            <h4>Added blogs</h4>
            <ul>
                {blogs.map(blog =>
                    <li key={blog.id}>
                        {blog.title}
                    </li>
                )}
            </ul>
        </div>
    )
}

export default User