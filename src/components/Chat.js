import '../styles/Chat.css'
import {useEffect, useState} from "react";
import {addDoc, collection, serverTimestamp, onSnapshot, query, where} from "firebase/firestore"
import {auth, db} from "../firebase-config";
export const Chat = ({room}) => {
    const [newMessage, setNewMessage] = useState("")
    const messagesRef = collection(db, "messages")
    const [messages, setMessages] = useState([])
    useEffect(()=>{
        const queryMessages = query(messagesRef, where("room","==",room))
        const unsubscribe = onSnapshot(queryMessages, (snapshot)=>{
            let messages = []
            snapshot.forEach((doc)=>{
                messages.push({...doc.data(), id: doc.id})
            })
            setMessages(messages)
        })

        return () => unsubscribe()
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(newMessage === "") return;
        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room: room
        })
        setNewMessage("")
    }
    return <div className="chat-app">
        <div className="header">
            {`Welcome to ${room}`}
        </div>
        <div className="messages">
            {messages.map((message)=> {
                return <div className="message" key={message.id}>
                    <span className="user">
                        {message.user}
                    </span>
                    {message.text}
                </div>
            })}
        </div>
        <form className="new-message-form" onSubmit={handleSubmit}>
            <input className="new-message-input"
                   placeholder="type message here..."
                   value={newMessage}
                   onChange={(e)=>setNewMessage(e.target.value)}/>
            <button type="submit" className="send-button">Send</button>
        </form>
    </div>
}