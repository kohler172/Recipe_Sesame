import React, { useState } from 'react';
import Message from '../Message/Message';
import './MessageContainer.css';

const MessageContainer = (props) => {
    return (
        <div className="messageContainer">
            { props.messages.slice(0).reverse().map((message, index) => (
                (index < (props.messages.length - 1)) && (props.messages[index + 1].isUserMessage == props.messages[index].isUserMessage) ? (
                    <Message key={index} content={message.content} isUserMessage={message.isUserMessage} />
                ) : (
                    <Message key={index} content={message.content} isUserMessage={message.isUserMessage} />
                )
            ))}
        </div>
    );
}

export default MessageContainer;