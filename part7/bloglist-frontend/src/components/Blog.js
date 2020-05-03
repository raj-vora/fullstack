import React from 'react'
import { useDispatch } from 'react-redux'
import { setNotif } from '../reducers/notificationReducer'
import { newLike, removeBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {

    const dispatch = useDispatch()

    const likeBlog = () => {
        dispatch(newLike(blog))
        dispatch(setNotif(`You liked ${blog.title}`, 3))
    }

    const deleteBlog = () => {
        const result = window.confirm(`Remove ${blog.title} by ${blog.author}`)
        if(result){
            dispatch(removeBlog(blog.id))
            dispatch(setNotif(`Deleted blog ${blog.title}`, 3))
        }
    }
    return(
        <div>
            <h2>{blog.title} by {blog.author}</h2>

            <a href={blog.url}>{blog.url}</a><br />
            {blog.likes} likes  
            <button onClick={likeBlog}>like</button><br />
            added by {blog.user.name}<br />
            <button onClick={deleteBlog}>remove</button>
        </div>
    )
}

export default Blog