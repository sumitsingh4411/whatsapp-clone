import React,{useState , useEffect} from 'react'
import "./Sidebar.css";
import {Avatar, IconButton} from "@material-ui/core"
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import Sidebarchat from "./Sidebarchat";
import {useStateValue} from "./Stateprovider"
import db from "./firebase"
function Sidebar() {
  const[room, setroom]=useState([]);
  const[{user},dispatch]=useStateValue();
    useEffect(()=>{
      db.collection('rooms').onSnapshot((snapshot)=>(
        setroom(
        snapshot.docs.map((docs)=>({
          id: docs.id,
           data :docs.data()
        }))
      )))
    },[])
    return (
        <div className="sidebar">
         
         <div className="sidebar_header">
          <Avatar src={user?.photoURL}/>
          <div className="sidebar_header_right">
              <IconButton>
          <DonutLargeIcon/>
               </IconButton>
               <IconButton>    
              <ChatIcon/>
              </IconButton>
              <IconButton>
            <MoreVertIcon/>
            </IconButton>
          </div>
         </div>
         <div className="sidebar_search">
             <div className="sidebar_search_continer">
          <SearchOutlinedIcon/>
         <input placeholder="search or Add new chat" type="text"/>
         </div>
         </div>
        <div className="sidebar_charts">
          <Sidebarchat addnewchat/>
          {
            room.map((r)=>(
                <Sidebarchat key={r.id}
                id={r.id}
                name={r.data.name}
                />
            )
            )
          }
        </div>
        </div>
    )
}

export default Sidebar
