import React, { useState } from 'react';
import { Amplify } from 'aws-amplify';
import { Interactions } from 'aws-amplify';
import styles from '../styles/FloatingChatBot.module.css'; // we'll define styles next

const FloatingChatBot = () => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
      { from: 'bot', text: 'Hello! How can I help you today?' }
    ]);
    const [input, setInput] = useState('');
  
    const sendMessage = async () => {
      if (!input.trim()) return;
  
      setMessages([...messages, { from: 'user', text: input }]);
  
      try {
        const response = await Amplify.Interactions.send("CakeFactoryAssistant", input);
        setMessages(prev => [...prev, { from: 'bot', text: response.message }]);
      } catch (err) {
        console.error("Lex error:", err);
        setMessages(prev => [...prev, { from: 'bot', text: "Oops, something went wrong." }]);
      }
  
      setInput('');
    };
  
    return (
      <div className={styles.chatWrapper}>
        {open && (
          <div className={styles.chatBox}>
            <div className={styles.header}>Chat with us</div>
            <div className={styles.messages}>
              {messages.map((m, i) => (
                <div key={i} className={m.from === 'bot' ? styles.botMsg : styles.userMsg}>
                  {m.text}
                </div>
              ))}
            </div>
            <div className={styles.inputWrapper}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type a message..."
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </div>
        )}
        <button className={styles.fab} onClick={() => setOpen(!open)}>
          {open ? '×' : '💬'}
        </button>
      </div>
    );
  };
  
  export default FloatingChatBot;