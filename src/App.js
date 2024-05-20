import { useState } from 'react'
import './App.scss'
import avatar from './images/bozai.png'
import _ from 'lodash'
import classNames from 'classnames'

/**
  * Rendering and operation of comment list
  *
  * 1. Render the comment list based on status
  * 2. Delete comments
  */

// Comment list data
const defaultList = [
  {
    // comment id
    rpid: 3,
    // User Info
    user: {
      uid: '13258165',
      avatar: '',
      uname: 'Jay Chou',
    },
    // comments
    content: 'Oh, not bad',
    //Comment time
    ctime: '10-18 08:15',
    like: 100,
  },
  {
    rpid: 2,
    user: {
      uid: '36080105',
      avatar: '',
      uname: 'John Smith',
    },
    content: 'I have searched for you thousands of times from sunrise to dusk',
    ctime: '11-13 11:29',
    like: 88,
  },
  {
    rpid: 1,
    user: {
      uid: '30009257',
      avatar,
      uname: 'Dark Horse Front End',
    },
    content: 'Learn front-end and come to Dark Horse',
    ctime: '10-19 09:00',
    like: 66,
  },
]
// Current logged in user information
const user = {
  // user id
  uid: '30009257',
  // profile picture
  avatar,
  // User's Nickname
  uname: 'Dark Horse Front End',
}

/**
  * Rendering and operation of navigation Tab
  *
  * 1. Render navigation Tab and highlight
  * 2. Sorting of comment list
  * Hottest => Descending number of likes
  * Latest => Creation time descending order
  */

// Navigate Tab array
const tabs = [
  { type: 'hot', text: 'Hottest' },
  { type: 'time', text: 'Latest' },
]


const App = () => {
  //1. Use useState to maintain the list
  const [commentList, setCommentList] = useState(_.orderBy(defaultList, 'like', 'desc'))

  //Delete comment function 
  const handleDelete = (id) => {
    console.log(id)
    //filter the commentList 
    setCommentList(commentList.filter(item => item.rpid !== id))
  }

  //tab switch function 
  //1. Record the type of the one clicked 
  //2. Control the display of the active class name by 
  // matching the recorded type with the type of each item traversed.
  const [type, setType] = useState('hot')
  const handleTabChange = (type) => {
    console.log(type)
    setType(type)
    //Sorting by comment list 
    if(type === 'hot') {
      // sort by likes number 
      //lodash
      setCommentList(_.orderBy(commentList, 'like', 'desc'))
    } else {
      // sort by created time 
      setCommentList(_.orderBy(commentList, 'ctime', 'desc'))
    }
  }

  return (
    <div className="app">
      {/* Navigation Tab */}
      <div className="reply-navigation">
        <ul className="nav-bar">
          <li className="nav-title">
            <span className="nav-title-text">Comments</span>
            {/* Number of comments */}
            <span className="total-reply">{10}</span>
          </li>
          <li className="nav-sort">
            {/* Highlight class name: active */}
            {tabs.map(item =>
              <span
                key={item.type}
                onClick={() => handleTabChange(item.type)}
                className={classNames('nav-item', { active: type === item.type })}>
                {item.text}
              </span>)}
          </li>
        </ul>
      </div>

      <div className="reply-wrap">
        {/* Comment */}
        <div className="box-normal">
          {/* Current user avatar */}
          <div className="reply-box-avatar">
            <div className="bili-avatar">
              <img className="bili-avatar-img" src={avatar} alt="User avatar" />
            </div>
          </div>
          <div className="reply-box-wrap">
            {/* Comment box */}
            <textarea
              className="reply-box-textarea"
              placeholder="Send a friendly comment"
            />
            {/* Publish button */}
            <div className="reply-box-send">
              <div className="send-text">Publish</div>
            </div>
          </div>
        </div>
        {/* comment list */}
        <div className="reply-list">
          {/* Comment item */}
          {commentList.map(item => (
            <div key={item.rpid} className="reply-item">
              {/* avatar */}
              <div className="root-reply-avatar">
                <div className="bili-avatar">
                  <img
                    className="bili-avatar-img"
                    alt=""
                    src={item.user.avatar}
                  />
                </div>
              </div>

              <div className="content-wrap">
                {/* username */}
                <div className="user-info">
                  <div className="user-name">{item.user.uname}</div>
                </div>
                {/* comments */}
                <div className="root-reply">
                  <span className="reply-content">{item.content}</span>
                  <div className="reply-info">
                    {/*Comment time */}
                    <span className="reply-time">{item.ctime}</span>
                    {/* Number of comments */}
                    <span className="reply-time">Likes:{item.like}</span>
                    {/* user.uid === item.user.uid, show Delete button */}
                    {user.uid === item.user.uid &&
                      <span className="delete-btn" onClick={() => handleDelete(item.rpid)}>
                        Delete
                      </span>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App