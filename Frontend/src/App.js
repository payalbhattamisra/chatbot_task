import React, { useState } from 'react';
import './App.css';

const App = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSendMessage = () => {
        if (input.trim()) {
            setMessages([...messages, { text: input, sender: 'user' }]);
            setInput('');
            // Simulate bot response
            setTimeout(() => {
                setMessages([...messages, { text: input, sender: 'user' }, { text: 'This is a bot response.', sender: 'bot' }]);
            }, 1000);
        }
    };

    return (
        <div className="chatbot-container">
            <div className="chatbot-header">Chatbot</div>
            <div className="chatbot-window">
                {messages.map((message, index) => (
                    <div key={index} className={`chat-message ${message.sender}-message`}>
                        <div className="message-heading">{message.sender === 'user' ? 'USER' : 'BOT'}</div>
                        {message.text}
                    </div>
                ))}
            </div>
            <div className="chatbot-input">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default App;
