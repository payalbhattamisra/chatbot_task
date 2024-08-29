import React, { useState } from 'react';
import './App.css';

const App = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSendMessage = () => {
        if (input.trim()) {
            const newMessages = [...messages, { text: input, sender: 'user' }];
            setMessages(newMessages);
            setInput('');
            // Simulate bot response
            setTimeout(() => {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: 'This is a bot response.', sender: 'bot' }
                ]);
            }, 1000);
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newMessages = [
                    ...messages,
                    { text: 'Image uploaded', image: reader.result, sender: 'user' }
                ];
                setMessages(newMessages);

                // Simulate bot response based on the image classification
                const suggestion = getPlumberSuggestion(file);
                setTimeout(() => {
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        { text: suggestion, sender: 'bot' }
                    ]);
                }, 1000);
            };
            reader.readAsDataURL(file);
        }
    };
    const getPlumberSuggestion = (file) => {
        const fileName = file.name.toLowerCase();
    
        if (fileName.includes('leak')) {
            return 'It looks like you have a water leak. Steps to take:\n' +
                   '1. Turn off the water supply.\n' +
                   '2. Use a bucket to catch water.\n' +
                   '3. Apply waterproof tape or a clamp as a temporary fix.\n' +
                   '4. Contact a plumber for a permanent repair.';
        } else if (fileName.includes('burst')) {
            return 'It seems a pipe has burst. Steps to take:\n' +
                   '1. Shut off the main water valve.\n' +
                   '2. Drain water from pipes by turning on all cold taps.\n' +
                   '3. Wrap the burst pipe with rubber or waterproof tape.\n' +
                   '4. Seek immediate assistance from a plumber.';
        } else if (fileName.includes('clog')) {
            return 'This appears to be a clogged drain. Here’s what to do:\n' +
                   '1. Try using a plunger to dislodge the clog.\n' +
                   '2. If that doesn’t work, use a drain snake or auger.\n' +
                   '3. Avoid using harsh chemicals as they can damage pipes.\n' +
                   '4. Contact a plumber if the clog persists.';
        } else if (fileName.includes('faucet')) {
            return 'It looks like there’s an issue with the faucet. Steps to fix it:\n' +
                   '1. Turn off the water supply to the faucet.\n' +
                   '2. Check the washers and replace them if they are worn.\n' +
                   '3. Tighten any loose connections.\n' +
                   '4. If the faucet is still leaking, consider replacing it or call a plumber.';
        } else if (fileName.includes('low pressure')) {
            return 'You might be experiencing low water pressure. Try this:\n' +
                   '1. Check if the pressure issue is isolated to one faucet or is throughout the house.\n' +
                   '2. Clean the aerators on the faucets to remove any buildup.\n' +
                   '3. Check for leaks in the system, which could be causing the drop in pressure.\n' +
                   '4. If the issue persists, it may be related to your water supply, and you should contact a plumber.';
        } else {
            return 'The issue is unclear from the image provided. Here’s what you can do:\n' +
                   '1. Provide more details about the problem.\n' +
                   '2. Try troubleshooting common issues like leaks or clogs.\n' +
                   '3. If you’re unsure, it’s best to call a plumber to inspect the situation.';
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
                        {message.image && <img src={message.image} alt="Uploaded content" className="uploaded-image" />}
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
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default App;
