import React, {useState} from 'react'

const Blog = ({blog, deleteBlog, likeBlog}) => {
    const [visible, setVisible] = useState(false)

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
    
    const buttonLabel = visible ? 'hide' : 'view'
    return(
        <div style={blogStyle} className='blog'>
            {blog.title} {blog.author}
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