import { Avatar } from '@material-ui/core';
import React,{useState,useEffect} from 'react'
import "./Chat.css";
import {IconButton} from "@material-ui/core"
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MicIcon from '@material-ui/icons/Mic';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { useParams } from 'react-router-dom';
import db from "./firebase"
import  firebase from "firebase"
import {useStateValue} from "./Stateprovider"
function Chat() {
    const [input,setinput]=useState('');
    const {roomId}=useParams();
    const [roomName ,setRoomName]=useState([]);
    const[messages,setMessages]=useState([]);
    const[{user},dispatch]=useStateValue();
    useEffect(()=>{
      if(roomId)
      {
       db.collection('rooms').doc(roomId).onSnapshot(snapshot=>(
         setRoomName(snapshot.data().name)));
       db.collection('rooms').doc(roomId)
       .collection("messages")
       .orderBy("timestamp","asc")
       .onSnapshot((snapshot)=>
             setMessages(snapshot.docs.map((doc)=>
             doc.data()
             )))
      }
    },[roomId])
    const sendMessage=(e)=>{
        e.preventDefault();
        db.collection("rooms").doc(roomId).collection
        ("messages").add({
          message:input,
          name:user.displayName,
          timestamp:firebase.firestore.FieldValue.serverTimestamp(),
        })
        setinput("");
    }
    const[seed,setseed]=useState('');
    useEffect(()=>{
        setseed(Math.floor(Math.random()*5000));
      },[roomId])
    return (
        
        <div className="chat">
            <div className="chat_header">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
            <div className="chat_headerinfo">
              <h3>{roomName}</h3>
              <p>
                last seen{" "}
                {
               new Date(
                 messages[messages.length-1]?.
                 timestamp?.toDate()).toUTCString()
                }
              </p>
            </div>
            <div className="chat_headerright">
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
            <div className="chat_body">
              {
                messages.map((message)=>(
                <p className={`chat_bodymessage ${ message.name===user.displayName && 'chat_reciever'}`}>
                  <span className="chat_name">{message.name}</span>
                  
               {message.message}
               <span className="chat_time">
                 {
                   new Date(message.timestamp?.toDate()).toUTCString()
                 }
               </span>
              </p>
                ))
              }
            </div>
            <div className="chat_footer">
                <InsertEmoticonIcon/>
              <form>
                  <input value={input} placeholder="type a message" type="text"
                  onChange={ e=>{
                      setinput(e.target.value);
                  }}/>
                  <button type="submit" onClick={sendMessage}> send a message</button>
              </form>
              <MicIcon/>
            </div>
        </div>
    )
}

export default Chat
