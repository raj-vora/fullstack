import React from 'react'

const notification = (message) => (
    <div>
      {
        message === null
        ? null
        : <div className='error'> { message } </div>
      }
    </div>
)

export default notification