import React from 'react';
import Message from '../Message/Message';
import './MessageContainer.css';

const MessageContainer = (props) => {
    return (
        <div className="messageContainer">
            { props.messages.map((message, index) => (
                <Message key={index} content={message.content} isUserMessage={message.isUserMessage} />
            )) }
        </div>
    );
}

export default MessageContainer;