import React, { useState } from 'react'
import HomeIcon from '@material-ui/icons/Home';
import FeaturedPlayListOutlinedIcon from '@material-ui/icons/FeaturedPlayListOutlined';
import {Avatar, Button, Input} from '@material-ui/core';
import {
  Search,
  AssignmentTurnedInOutlined,
  PeopleAltOutlined,
  NotificationsOutlined,
  ExpandMore,
  // Close
} from '@material-ui/icons';

import CloseIcon from "@material-ui/icons/Close"

import { auth } from "../Firebase";
import { signOut } from "firebase/auth";
import { logout, selectUser } from "../feature/userSlice";
import { useDispatch, useSelector } from "react-redux";


import './css/qHeader.css';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import axios from 'axios';

function Header() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputURL, setInputURL] = useState("");
  const [question, setQuestion] = useState("");
  const Close = <CloseIcon/>;
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleSubmit = async() => {
    console.log("Clicked");
    if(question !== "") {

      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      }

      const body = {
        questionName: question,
        questionUrl: inputURL,
        user: user,
      }
      await axios.post('/api/questions', body, config).then((res) => {
        console.log(res.data)
        alert(res.data.message)
      }).catch((e) => {
        console.log(e)
        alert("Error in adding question!")
        window.location.href = "/"
      })
    }
  }

  const handleLogout = () => {
    if (window.confirm("Do you want to logout ?")) {
      signOut(auth).then(() => {
        dispatch(logout())
        console.log(`${user?.photoUrl}`)
        console.log("Logging out");
      }).catch(() => {
        console.log("Error in logging out!");
      })
    }
  }

  return (
    <div className = 'qHeader'>
        <div className = 'qHeader-content'>
            <div className = 'qHeader-logo'>
                <img src = 'https://video-public.canva.com/VAD8lt3jPyI/v/ec7205f25c.gif' alt = 'logo' />
            </div>

            <div className = 'qHeader-icons'>
              <div className = 'qHeader-icon'><HomeIcon/></div>
              <div className = 'qHeader-icon'><FeaturedPlayListOutlinedIcon/></div>
              <div className = 'qHeader-icon'><AssignmentTurnedInOutlined/></div>
              <div className = 'qHeader-icon'><PeopleAltOutlined/></div>
              <div className = 'qHeader-icon'><NotificationsOutlined/></div>
            </div>

            <div className = 'qHeader-input'>
              <Search/>
              <input type = 'text' placeholder = 'Search'/>
            </div>

            <div className = 'qHeader-profile'>
             <span onClick={handleLogout}>
              {/* <Avatar src={user?.photoURL} /> */}
              <Avatar src = "https://lh3.googleusercontent.com/a-/AFdZucqaqJsQNNLwZio_gGGD2vrYnptf-GBtD05NyxDk=s96-c" />
             </span> 
            </div>

            <Button className = 'addQues' onClick={()=> setIsModalOpen(true)}>Add Question</Button>

            <Modal
            open = {isModalOpen}
            closeIcon = {Close}
            onClose = {()=> setIsModalOpen(false)}
            closeOnEsc
            center
            closeOnOverlayClick = {false}
            styles = {{
              overlay: {
                height: "auto",
              }
            }}
            >
              <div className= "modal_title">
                <h5>Add Question</h5>
                <h5>Share Link</h5>
              </div>

              <div className = "modal_info">
                <Avatar className = "avatar"/>
                <div className="modal_scope">
                  <PeopleAltOutlined/>
                  <p>Public</p>
                  <ExpandMore/>
                </div>
              </div>
              
              <div className='modal_field'>
                <Input 
                value = {question}
                onChange={(e) => setQuestion(e.target.value)}
                type= 'text' 
                placeholder='Start your question with "What", "Why", "How" etc.'/>
                <div style = {{
                  display: "flex",
                  flexDirection: "column"
                }}>
                  <input type='text' 
                        value = {inputURL}
                        onChange = {(e)=> setInputURL(e.target.value)}
                        style = {{
                          margin: "5px 0",
                          border: "1px solid lightgray",
                          padding: "10px",
                          outline: "2px solid #000",
                        }}
                  placeholder='Optional: include a link that gives context'/>

                  {inputURL !== "" && (
                    <img style = {{
                      height: "40vh",
                      objectFit: "contain",
                    }} src={inputURL} alt = 'img'/>
                  )}
                  
                </div>
              </div>

              <div className='modal_buttons'>
                <button className='cancel' onClick={()=> setIsModalOpen(false)}>
                  Cancel
                </button>
                <button onClick={handleSubmit} type='submit' className='add'>
                  Add Question
                </button>
              </div>
            </Modal>

        </div>
    </div>
  )
}

export default Header;