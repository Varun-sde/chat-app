"use client";

import React, { useEffect } from 'react'
import { useChat, Message } from "ai/react";
import Logo from './Logo';

interface UserMessageProps {
    message: Message;
}

const UserMessage: React.FC<UserMessageProps> = ({ message }) => {
    return (
      <div className='user' key={message.id}>
        <p className='py-1 px-3 rounded bg-zinc-800'>
          {
            message.content.split("\n").map((line, index) => (
              line === "" ? <span key={index}>&nbsp;</span> : <span key={index}>{line}<br /></span>
            ))
          }
        </p>
      </div>
    );
};

const BotMessage: React.FC<UserMessageProps> = ({ message }) => {
    return (
      <div className='bot rounded' key={message.id}>
        <Logo />
        <p className='mt-1'>
         {
           message.content.split("\n").map((line, index) => (line === "" ? <span key={index}>&nbsp;</span> : <span key={index}>{line}<br /></span>))
         }
        </p>
      </div>
    );
  };

const ChatInterface = () => {
  const { input, handleInputChange, handleSubmit, isLoading, messages } = useChat();
  useEffect(()=>{
    console.log(messages)
  },[])
  return (
    <div className="item-2">
      <div className="interface">
      {
        messages.map((item: Message) => (item.role === "user" ? (<UserMessage key={item.id} message={item} />) : (<BotMessage key={item.id} message={item} />)))
      }
      </div>
      <form onSubmit={handleSubmit}>
        <input placeholder="Enter your query here" className='py-2 px-3 flex bg-zinc-800 rounded-md no-underline hover:bg-zinc-800 duration-300 border' value={input} onChange={handleInputChange}/>
        <button type="submit" className='rounded bg-blue-500' disabled={isLoading}>Send</button>
      </form>
    </div>
  )
}

export default ChatInterface