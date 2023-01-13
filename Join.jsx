import React, { useState } from "react";
import styled from "styled-components";
import {Link} from "react-router-dom"
const Container = styled.div`
      
      width: 100vw;
      height: 100vh;
      background-color: #151515;
      color: #004c00;
      display: flex;
      align-items: center;
      background: url("/images/safe.jpg") no-repeat center center/cover;
      object-fit: cover;
`
const JoinContainer = styled.div`
      width: 50%;
      height: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
`

const TextLogo = styled.h1`
      color: #ffffff;
      margin: 0;
      text-align: center;
      font-size: 40px;
      font-family: 'Pacifico', cursive;
      letter-spacing: 1.2px;
      font-weight: 300;
      padding: 10px 0;
      margin-bottom: 10px;
`
const Input = styled.input`
      border: none;
      background: transparent;
      border-bottom: 1px solid white;
      margin-top: 10px;
      margin-bottom: 10px;
      padding: 5px;
      font-size: 20px;
      color: white !important;
`
const Button  = styled.button`
      border: none;
      background-color: transparent;
      color: white;
      border: 1px solid white;
      border-radius: 5px;
      font-size: 20px;
      padding: 10px 40px;
      cursor: pointer;
      margin-top: 20px;
      transition: all .5s ease-in-out;

      &:hover{
            transform: scale(1.1);
      }

`
let user;

function Join()
{
      const sendUser = ()=>{
            user = document.getElementById("userId").value;
            document.getElementById("userId").value = "";
      }
      const [name, setname] = useState("")
      return(
            <Container>
                  <JoinContainer>
                        <TextLogo>
                              chat X
                        </TextLogo>
                        <Input onChange={(e)=> setname(e.target.value) } placeholder="Enter Your Name" id="userId"></Input>
                        <Input placeholder="Enter Your Age"></Input>
                        <Input placeholder="Enter Your Phone Number"></Input>
                        <Link onClick={(e)=> !name? e.preventDefault() : null} to="/chat"> <Button onClick={sendUser}>Log In</Button></Link>
                  </JoinContainer>
            </Container>
      )
}

export default Join;
export {user};