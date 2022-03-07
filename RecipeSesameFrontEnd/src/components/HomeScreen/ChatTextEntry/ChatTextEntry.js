import React, { useState } from 'react';
import './ChatTextEntry.css';

const ChatTextEntry = (props) => {
    const [textContent, setTextContent] = useState('');
    const messageUrl = 'http://localhost:8000/message/';
    const rasa_url = 'http://localhost:5005/webhooks/rest/webhook'

    const handleTextChange = (event) => {
        setTextContent(event.target.value);
    }

    const handleSend = (event) => {
        event.preventDefault();

        if (textContent.length > 0) {
            props.addMessage({ content: textContent, isUserMessage: true });
            //props.incrementNumberOfMessagesSent();
            fetch(messageUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({'sender': "test", 'message': textContent})
            })
                .then(response => response.json())
                .then(data => {
                    props.setRecommendedRecipes(data);
                    setTextContent('');
                });

            fetch(rasa_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({'sender': "default", 'message': textContent})
            })
                .then(response => response.json())
                .then(data => {     
                    data.forEach((x, i) => props.addMessage({ content: data[i].text, isUserMessage: false }));                    
                    props.incrementNumberOfMessagesSent();
                });
        }
    }

    return (
        <div>
            <form className="chatTextEntry" onSubmit={handleSend}>
                <input className="input" type="text" placeholder="Enter text." onChange={handleTextChange} value={textContent}></input>
                <input className="send" type="submit" value="Send"></input>
            </form>
        </div>
    );
}

export default ChatTextEntry;