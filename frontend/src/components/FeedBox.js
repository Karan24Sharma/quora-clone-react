import React from 'react'
import {Avatar} from '@material-ui/core'
import './css/FeedBox.css'
import { useSelector } from 'react-redux'
import { selectUser } from '../feature/userSlice'

function FeedBox() {
  const user = useSelector(selectUser);
  return (
    <div className='feedbox'>
        <div className='feedbox-info'>
            <Avatar src = {user?.photo}/>
        </div>

        <div className='feedbox-content'>
            <h5>What is your question ?</h5>
        </div>
    </div>
  )
}

export default FeedBox