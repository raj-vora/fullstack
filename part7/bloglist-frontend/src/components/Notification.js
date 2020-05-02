import React from 'react'
import { useSelector } from 'react-redux'


const Notification = () => {
  const notification = useSelector(state => state.notification)
  
  return (
    <div>
      {
        notification === 'remove'
        ? null
        : <div className='error' id="notif">{notification}</div>
      }
    </div>
  )
}

export default Notification