import blogService from '../services/blogService'

const reducer = (state=[], action) => {
    switch(action.type) {
        case 'INIT_BLOG':
            return action.data
        case 'NEW_BLOG':
            return state.concat(action.data)
        case 'LIKE_BLOG':
            return state.map(blog => blog.id !== action.data.id ? blog : action.data)
        case 'REMOVE_BLOG':
            return state.filter(blog => blog.id !== action.data)
        default:
            return state
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOG',
            data: blogs
        })
    }
}

export const newBlog = (blog) => {
    return async dispatch => {
        const newBlog = await blogService.create(blog)
        dispatch({
            type: 'NEW_BLOG',
            data: newBlog
        })
    }
}

export const newLike = (blog) => {
    return async dispatch => {
        const newBlog = await blogService.update(blog.id, {...blog, likes: blog.likes+1})
        dispatch({
            type: 'LIKE_BLOG',
            data: newBlog
        })
    }
}

export const removeBlog = (id) => {
    return async dispatch => {
        await blogService.remove(id)
        dispatch({
            type: 'REMOVE_BLOG',
            data: id
        })
    }
}

export default reducer