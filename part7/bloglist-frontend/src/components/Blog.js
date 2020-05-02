import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { setNotif } from '../reducers/notificationReducer'
import { newLike, removeBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
    const [visible, setVisible] = useState(false)

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

    const enlarge = {display: visible ? '' : 'none'}
    const toggleView = () => {
        setVisible(!visible)
    }
    
    const buttonLabel = visible ? 'hide' : 'view'
    return(
        <div className='blog'>
            {blog.title} by {blog.author}
            <button onClick={toggleView}>{buttonLabel}</button> 
            <div style={enlarge} className="hidden">
                {blog.url}<br />
                likes {blog.likes} 
                <button onClick={likeBlog}>like</button><br />
                {blog.user.name}<br />
                <button onClick={deleteBlog}>remove</button>
            </div>
        </div>
    )
}

export default Blog