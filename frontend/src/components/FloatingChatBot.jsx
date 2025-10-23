import React, { useState } from 'react';
import styles from '../styles/FloatingChatBot.module.css';

const FloatingChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hello! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;
  
    setMessages(prev => [...prev, { from: 'user', text: input }]);
  
    try {
      const res = await fetch("http://localhost:5001/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });
  
      const data = await res.json();
      console.log("Lex response:", data);
  
      let botReply = "Sorry, I didn’t quite get that.";
  
      if (data.messages && data.messages.length > 0) {
        const firstMessage = data.messages[0];
        if (firstMessage.content) botReply = firstMessage.content;
        else if (firstMessage.content?.[0]?.content)
          botReply = firstMessage.content[0].content;
      }
  
      setMessages(prev => [...prev, { from: "bot", text: botReply }]);
    } catch (err) {
      console.error("Lex error:", err);
      setMessages(prev => [
        ...prev,
        { from: "bot", text: "Oops, something went wrong." },
      ]);
    }
  
    setInput("");
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
