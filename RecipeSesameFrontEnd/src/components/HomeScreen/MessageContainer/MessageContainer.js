import React, { useState } from 'react';
import Message from '../Message/Message';
import './MessageContainer.css';

const MessageContainer = (props) => {
    return (
        <div className="messageContainer">
            { props.messages.slice(0).reverse().map((message, index) => (
                (message.isUserMessage) ? (
                    <Message key={index} content={message.content} isUserMessage={message.isUserMessage} />
                ) : (
                    <Message key={index} content={message.content.charAt(0).toUpperCase() + message.content.slice(1)} isUserMessage={message.isUserMessage} />
                )
            ))}
        </div>
    );
}

export default MessageContainer;