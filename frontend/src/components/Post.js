import React, { useState } from 'react'
import './css/Post.css'
import { Avatar } from '@material-ui/core'
import { ArrowDownwardOutlined, ArrowUpwardOutlined, ChatBubbleOutlined, MoreHorizOutlined, RepeatOneOutlined, ShareOutlined } from '@material-ui/icons'
import CloseIcon from "@material-ui/icons/Close"
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import ReactTimeAgo from 'react-time-ago'
import axios from 'axios'
import ReactHtmlParser from 'html-react-parser'
import { useSelector } from 'react-redux'
import { selectUser } from '../feature/userSlice'

function LastSeen({ date }) {
    return (
        <div>
            <ReactTimeAgo date={date} locale="en-US" timeStyle="round" />
        </div>
    )
}

function Post({ post }) {

  const user = useSelector(selectUser);

    const handleQuill = (value) => {
        setAnswer(value);
    }

    const handleSubmit = async () => {
        if (post?._id && answer !== "") {
            const config = {
                "Content-Type": "application/json"
            }
            const body = {
                answer: answer,
                questionId: post?._id,
                user: user,
            }
            await axios.post('/api/answers', body, config).then((res) => {
                console.log(res.data)
                alert("Answer added successfully")
                window.location.href = '/'
            }).catch((e) => {
                console.log(e)
            })
        }
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [answer, setAnswer] = useState("");
    const Close = <CloseIcon />;

    return (
        <div className='post'>
            <div className='post-info'>
                <Avatar src = {post?.user?.photoURL}/>
                <h4>{post?.user?.displayName}</h4>
                <small><LastSeen date={(post?.createdAt).toLocaleString()} /></small>
            </div>

            <div className='post-body'>
                <div className='post-question'>
                    <p>{post?.questionName}</p>
                    <button onClick={() => setIsModalOpen(true)} className='post-btnans'>Answer</button>
                    <Modal
                        open={isModalOpen}
                        closeIcon={Close}
                        onClose={() => setIsModalOpen(false)}
                        closeOnEsc
                        center
                        closeOnOverlayClick={false}
                        styles={{
                            overlay: {
                                height: "auto",
                            }
                        }}>
                        <div className='modal_question'>
                            <h1>{post?.questionName}</h1>
                            <p>asked by {""} <span className='name'>UserName</span> on <span className='name'>{new Date(post?.createdAt).toLocaleString()}</span></p>
                        </div>
                        <div className='modal_answer'>
                            <ReactQuill value={answer} onChange={handleQuill} theme="snow" placeholder='Enter your answer'></ReactQuill>
                        </div>
                        <div className='modal_buttons'>
                            <button className='cancel' onClick={() => setIsModalOpen(false)}>
                                Cancel
                            </button>
                            <button onClick={handleSubmit} type='submit' className='add'>
                                Add Answer
                            </button>
                        </div>
                    </Modal>
                </div>
                {
                    post.questionUrl !== "" && <img src={post.questionUrl} alt="url" />
                }
            </div>

            <div className='post-footer'>
                <div className='post-footerAction'>
                    <ArrowUpwardOutlined />
                    <ArrowDownwardOutlined />
                </div>
                <RepeatOneOutlined />
                <ChatBubbleOutlined />
                <div className='post-footerRight'>
                    <ShareOutlined />
                    <MoreHorizOutlined />
                </div>
            </div>

            <p style={{
                color: "rgba(0,0,0,0.5)",
                fontSize: "12px",
                fontWeight: "bold",
                margin: "10px 0"
            }}>
                {post.allAnswers.length} Answer(s)
            </p>

            <div
        style={{
          margin: "5px 0px 0px 0px ",
          padding: "5px 0px 0px 20px",
          borderTop: "1px solid lightgray",
        }}
        className="post-answer"
      >
        {post?.allAnswers?.map((_a) => (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                padding: "10px 5px",
                borderTop: "1px solid lightgray",
              }}
              className="post-answer-container"
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#888",
                }}
                className="post-answered"
              >
                <Avatar src={_a?.user?.photo} />
                <div
                  style={{
                    margin: "0px 10px",
                  }}
                  className="post-info"
                >
                  <p>{_a?.user?.userName}</p>
                  <span>
                    <LastSeen date={_a?.createdAt} />
                  </span>
                </div>
              </div>
              <div className="post-answer">{ReactHtmlParser(_a?.answer)}</div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}


export default Post;
