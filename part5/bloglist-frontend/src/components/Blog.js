import React, {useState} from 'react'
import blogService from '../services/blogService'

const Blog = ({blog, deleteBlog}) => {
    const [visible, setVisible] = useState(false)
    const [newBlog, setNewBlog] = useState(blog)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
      }
      const enlarge = {display: visible ? '' : 'none'}

    const toggleView = () => {
        setVisible(!visible)
    }

    const likeBlog = async() => {
        const response = await blogService.update(newBlog.id, {...newBlog, likes: newBlog.likes+1})
        setNewBlog(response)
    }
    
    const buttonLabel = visible ? 'hide' : 'view'
    return(
        <div style={blogStyle}>
            {newBlog.title} {newBlog.author}
            <button onClick={toggleView}>{buttonLabel}</button> 
            <div style={enlarge}>
                {newBlog.url}<br />
                likes {newBlog.likes} 
                <button onClick={likeBlog}>like</button><br />
                {blog.user.name}<br />
                <button onClick={deleteBlog}>remove</button>
            </div>
        </div>
    )
}

export default Blog