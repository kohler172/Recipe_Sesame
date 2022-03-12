import React, { useState } from 'react';
import Message from '../Message/Message';
import './MessageContainer.css';

const MessageContainer = (props) => {
    return (
        <div className="messageContainer">
            { props.messages.slice(0).reverse().map((message, index) => (
                (index < props.messages.length - 1) && (message.isUserMessage === props.messages[index + 1].isUserMessage)) ? (
                    <Message key={index} content={message.content} isUserMessage={message.isUserMessage} firstInGroup={true} lastInGroup={false} />
                ) : (
                    (index > 0) && (message.isUserMessage === props.messages[index - 1].isUserMessage)) ? (
                        <Message key={index} content={message.content} isUserMessage={message.isUserMessage} firstInGroup={false} lastInGroup={true} />
                    ) : (
                        <Message key={index} content={message.content} isUserMessage={message.isUserMessage} firstInGroup={false} lastInGroup={false} />
                    )
                )
            }
        </div>
    );
}

export default MessageContainer;