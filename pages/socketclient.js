import { useEffect } from "react";
import io from 'socket.io-client';


export default () => {
    useEffect(() => {
        fetch('/api/socketserver').finally(() => {
            const socket = io()

            socket.on('connect', () => {
                console.log('connect')
                socket.emit('hello')
            })

            socket.on('hello', data => {
                console.log('hello', data)
            })

            socket.on('a user connected', () => {
                console.log('a user connected')
            })

            socket.on('disconnect', () => {
                console.log('disconnect')
            })
        })
    }, [])
} // Added [] as useEffect filter so it will be executed only once, when component is mounted
