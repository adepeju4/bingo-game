import Channel from './bingo/Channel.js'

import { useEffect } from 'react';
import io from 'socket.io-client';
import {container} from '../styles/game.module.css'

const Game = () => {

        useEffect(() => {
          fetch("/api/socketserver").finally(() => {
            const socket = io();

            socket.on("connect", () => {
              console.log("connected");
              socket.emit("hello");
            });

            socket.on("hello", (data) => {
              console.log("hello", data);
            });

            socket.on("a user connected", () => {
              console.log("a user connected");
            });

            socket.on("disconnect", () => {
              console.log("disconnected");
            });
          });
        }, []);
    return (
     
      <div className={container}>
        <Channel/>
        </div>
    
     );
}
 
export default Game;