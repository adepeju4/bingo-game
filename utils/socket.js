import { io } from "socket.io-client";


const socket = io("/api", {
  autoConnect: false,
  withCredentials: true,
});


export default socket;