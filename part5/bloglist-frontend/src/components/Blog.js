import React, {useState} from 'react'


const Blog = ({blog, user}) => {
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
        <div style={blogStyle}>
            {blog.title} {blog.author}
            <button onClick={toggleView}>{buttonLabel}</button> 
            <div style={enlarge}>
                {blog.url}<br />
                likes {blog.likes} <br />
                {blog.user.name}
            </div>
        </div>
    )
}

export default Blog