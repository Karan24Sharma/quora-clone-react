import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Feed from './Feed'
import Widget from './Widget'

import './css/Quora.css'

function Quora() {
  return (
    <div className = "quora">
        <Header/>

        <div className = "quora-contents"> 
              <div className = "quora-content">
                <Sidebar/>
                <Feed/>
                <Widget/>
              </div>
        </div>
    </div>
  );
}

export default Quora