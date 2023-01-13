import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { user } from "./Join";
import socketIo from "socket.io-client"
import Message from "./Message";
import ReactScrollToBottom from "react-scroll-to-bottom"
import "./Chat.css"
import "./Message.css"
const ENDPOINT = "http://localhost:4500";
let socket;







const Container = styled.div`
      width: 100vw;
      height: 100vh;
      background-color: #1c1c1c;
      display: flex;
      justify-content: center;
      align-items: center;

`
const ChatContainer = styled.div`
      width: 50%;
      height: 60%;
      background-color: white;


`
const Header = styled.div`
      padding: 20px;
      background-color: #434343;
      color: white;
      font-size: 25px;
      font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
      text-align: center;
      align-items: center;
      font-weight: 700;
      letter-spacing: 1.3px;

`
const InputBox = styled.div`
      height: 15%;
      display: flex;

`

const Input = styled.input`
      width: 80%;
      height: 100%;
      border: none;
      padding: 0 40px;
      font-size: 20px;
      color: gray;
      border: 2px solid gainsboro;
`

const Button = styled.button`
      background-color: crimson;
      width: 20%;
      height: 100%;
      border: none;
      cursor: pointer;
      color: white;
      font-size: 20px;
      font-weight: 700;
      transition: all .3s ease-in-out;
      &:hover{
            background-color: #a30e2c;
      }
      

`

function Chat()
{
      const [id, setid] = useState("")
      const [messages, setmessages] = useState([])
      const send =()=>{
            const message = document.getElementById("sendMess").value;
            socket.emit('message', { message, id });
            document.getElementById("sendMess").value = " ";
      }
      useEffect(() => {
            socket = socketIo(ENDPOINT, { transports: ['websocket'] });
            socket.on('connect',()=>{
                  setid(socket.id);
        })
      socket.emit('joined',{user})
      socket.on('welcome',(data)=>{
            setmessages([...messages,data]);
            console.log(data.user + data.message);
      })
      socket.on('userjoined',(data)=>{
            setmessages([...messages,data]);
            console.log(data.user + data.message);
      })
      socket.on("leave",(data)=>{
            setmessages([...messages,data]);
            console.log(data.user,data.message);
      })
        return () => {
            socket.emit("disconect");
            socket.off();
        }
      }, [])

      useEffect(() => {
        socket.on("sendMessage",(data)=>{
            setmessages([...messages,data]);
            console.log(data.user,data.message,data.id)
        })
      
        return () => {
          socket.off()
        }
      }, [messages])
      
      
      return(
            <Container>
                  <ChatContainer>
                        <Header>WELCOME TO CHAT X</Header>
                        <ReactScrollToBottom className="chatBox">
                              {messages.map((item, i) => <Message user={item.id === id ? '' : item.user} message={item.message} classs={item.id === id ? 'right' : 'left'} />)}
                         </ReactScrollToBottom>
                        
                        <InputBox>
                              <Input placeholder="TYPE MESSAGE" id="sendMess" onKeyPress={(event)=>event.key === "Enter"? send():null} />
                              <Button onClick={send}>SEND</Button>
                        </InputBox>
                  </ChatContainer>
            </Container>
      )
}

export default Chat;