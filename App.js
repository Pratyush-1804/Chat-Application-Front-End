import socketIO from "socket.io-client";
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Join from "./Components/Join";
import Chat from "./Components/Chat";

const ENDPOINT = 'http://localhost:4500';

const socket = socketIO(ENDPOINT,{transports:['websocket']});


function App() {

  socket.on("connect",()=>{
    console.log("New Connection")
  })
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/chat" element={<Chat />}></Route>
          <Route path="/" element={<Join />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
