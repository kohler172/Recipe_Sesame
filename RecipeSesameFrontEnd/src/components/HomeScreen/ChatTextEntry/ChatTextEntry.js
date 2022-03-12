import React, { useState } from 'react';
import './ChatTextEntry.css';

const ChatTextEntry = (props) => {
    const [textContent, setTextContent] = useState('');
    const [keywords, setKeywords] = useState([]);
    const [negKeywords, setNegKeywords] = useState([]);
    const [isWaiting, setIsWaiting] = useState(false);
    const randomUrl = 'http://localhost:8000/random/';
    const messageUrl = 'http://localhost:8000/message/';
    const rasa_url = 'http://localhost:5005/webhooks/rest/webhook'

    const handleTextChange = (event) => {
        setTextContent(event.target.value);
    }

    const handleSend = (event) => {
        event.preventDefault();
        setIsWaiting(true);

        if (textContent.length > 0) {
            props.addMessage({ content: textContent, isUserMessage: true });
            props.addMessage({ content: '...', isUserMessage: false});
            setTextContent('');
            
            if (textContent.toLowerCase().search('search') > -1 || 
                textContent.toLowerCase().search('restart') > -1 ||
                textContent.toLowerCase().search('reset') > -1) {
                setIsWaiting(false);
                setKeywords([]);
                setNegKeywords([]);
                fetch(randomUrl)
                    .then(response => response.json())
                    .then(data => props.setRecommendedRecipes(data));
                    props.removeLastMessage();
                    props.addMessage({ content: "Your search has been reset. What would you like to look for?", isUserMessage: false })
            } else if (textContent.toLowerCase().search('show me more') > -1) {
                setIsWaiting(false);
                props.setResultStartingIndex(props.resultStartingIndex + 6 >= props.recommendedRecipes.length ? 0 : props.resultStartingIndex + 6);
                props.removeLastMessage();
                props.addMessage({ content: "Here's some other recipes.", isUserMessage: false })
            } else {
                fetch(messageUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({'sender': "test", 'message': textContent, 'keywords': keywords, 'negKeywords': negKeywords})
                })
                    .then(response => response.json())
                    .then(data => {
                        const parsedData = JSON.parse(data);
                        props.setRecommendedRecipes(parsedData.recipes);
                        setKeywords(parsedData.keywords);
                        setNegKeywords(parsedData.negKeywords);
                    });
    
                fetch(rasa_url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({'sender': "default", 'message': textContent.toLowerCase()})
                })
                    .then(response => response.json())
                    .then(data => {    
                        setIsWaiting(false); 
                        props.removeLastMessage();
                        data.forEach((x, i) => props.addMessage({ content: data[i].text, isUserMessage: false }));                    
                        props.incrementNumberOfMessagesSent();
                    });
            } 
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