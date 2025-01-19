import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userMessage = userInput;
    setMessages((prevMessages) => [...prevMessages, { text: userMessage, sender: 'user' }]);
    setUserInput('');

    try {
      const res = await fetch('https://your-server-endpoint.com/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: userMessage }),
      });
      const data = await res.json();
      setMessages((prevMessages) => [...prevMessages, { text: data.message, sender: 'server' }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prevMessages) => [...prevMessages, { text: 'An error occurred while communicating with the server.', sender: 'server' }]);
    }
  };

  return (
    <>
      <h1>Vite + React</h1>
      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={msg.sender === 'user' ? 'message user-message' : 'message server-message'}>
              {msg.text}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="card">
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            placeholder="Type something..."
            className="user-input"
          />
          <button type="submit">Send</button>
        </form>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
