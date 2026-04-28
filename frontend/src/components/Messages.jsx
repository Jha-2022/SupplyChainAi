import React, { useState, useEffect, useRef } from 'react';
import { Search, Send, Phone, MoreVertical, CheckCheck, Bot } from 'lucide-react';
import { shipments } from './RoutesPage.jsx';
import ReactMarkdown from 'react-markdown';
import './Messages.css';

// 1. Generate contacts from shipments + AI Assistant
const initialContacts = [
  {
    id: 'ai-assistant',
    name: 'SupplyChain AI',
    role: 'Virtual Assistant',
    avatar: 'ai',
    online: true,
    preview: 'How can I assist you with logistics today?',
    type: 'ai'
  },
  ...shipments.map(s => ({
    id: s.id,
    name: s.buyer.name,
    role: `Driver (${s.tid})`,
    avatar: `https://ui-avatars.com/api/?name=${s.buyer.name.replace(' ', '+')}&background=random`,
    online: s.status === 'On way' || s.status === 'Loading',
    preview: `Update on shipment ${s.id}?`,
    type: 'driver',
    shipmentDetails: s
  }))
];

// 2. Mock some initial chat history
const initialChats = {
  'ai-assistant': [
    { id: 1, text: 'Hello Admin. How can I assist you with logistics today?', sender: 'them', time: '09:00 AM' },
    { id: 2, text: 'Can you show me the delayed shipments?', sender: 'me', time: '09:02 AM' },
    { id: 3, text: 'Currently, you have 4 delayed shipments. Would you like me to draft rerouting options?', sender: 'them', time: '09:03 AM' },
  ],
  [initialContacts[1].id]: [
    { id: 1, text: `Hi, this is the driver for ${initialContacts[1].id}.`, sender: 'them', time: '10:15 AM' },
    { id: 2, text: 'Are you on track for the estimated arrival?', sender: 'me', time: '10:20 AM' },
  ]
};

const Messages = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeContactId, setActiveContactId] = useState(initialContacts[0].id);
  const [chatHistories, setChatHistories] = useState(initialChats);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  const contacts = initialContacts.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeContact = initialContacts.find(c => c.id === activeContactId);
  const currentChat = chatHistories[activeContactId] || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChat]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const messageText = inputText;
    const newMessage = {
      id: Date.now(),
      text: messageText,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatHistories(prev => ({
      ...prev,
      [activeContactId]: [...(prev[activeContactId] || []), newMessage]
    }));

    setInputText('');

    // Fetch real AI response from backend
    if (activeContactId === 'ai-assistant') {
      try {
        // Add a temporary typing indicator message
        const typingMsgId = Date.now() + 1;
        setChatHistories(prev => ({
          ...prev,
          [activeContactId]: [...(prev[activeContactId] || []), { id: typingMsgId, text: 'Thinking...', sender: 'them', time: '' }]
        }));

        const res = await fetch('http://localhost:5000/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: messageText, contextData: shipments })
        });
        const data = await res.json();
        
        // Remove typing indicator and add real response
        setChatHistories(prev => {
          const currentChats = prev[activeContactId] || [];
          const filteredChats = currentChats.filter(msg => msg.id !== typingMsgId);
          return {
            ...prev,
            [activeContactId]: [
              ...filteredChats, 
              {
                id: Date.now() + 2,
                text: data.reply || "Sorry, I encountered an error connecting to Gemini.",
                sender: 'them',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }
            ]
          };
        });
      } catch (error) {
        console.error("Failed to fetch AI response", error);
      }
    }
  };

  return (
    <div className="messages-container">
      
      {/* Left Pane: Contacts */}
      <div className="contacts-sidebar">
        <div className="contacts-header">
          <h2>Messages</h2>
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search drivers or AI..." 
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="contacts-list">
          {contacts.map(contact => (
            <div 
              key={contact.id} 
              className={`contact-item ${activeContactId === contact.id ? 'active' : ''}`}
              onClick={() => setActiveContactId(contact.id)}
            >
              <div className="contact-avatar">
                {contact.avatar === 'ai' ? (
                  <div className="avatar-img ai-avatar"><Bot color="white" /></div>
                ) : (
                  <img src={contact.avatar} alt={contact.name} className="avatar-img" />
                )}
                <div className={`status-indicator ${contact.online ? '' : 'offline'}`}></div>
              </div>
              <div className="contact-info">
                <h4 className="contact-name">{contact.name}</h4>
                <div className="contact-role">{contact.role}</div>
                <p className="contact-preview">
                  {chatHistories[contact.id] 
                    ? chatHistories[contact.id][chatHistories[contact.id].length - 1].text 
                    : contact.preview}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Pane: Chat Window */}
      {activeContact ? (
        <div className="chat-window">
          
          <div className="chat-header">
            <div className="chat-header-info">
              {activeContact.avatar === 'ai' ? (
                <div className="avatar-img ai-avatar"><Bot color="white" /></div>
              ) : (
                <img src={activeContact.avatar} alt={activeContact.name} className="avatar-img" />
              )}
              <div>
                <h3 className="chat-title">{activeContact.name}</h3>
                <span className="chat-status">{activeContact.online ? 'Online' : 'Offline'}</span>
              </div>
            </div>
            <div className="chat-actions">
              <Phone size={20} className="action-icon" />
              <MoreVertical size={20} className="action-icon" />
            </div>
          </div>

          <div className="chat-history">
            {currentChat.length === 0 ? (
              <div className="no-chat-selected">
                <p>No messages yet. Start the conversation!</p>
              </div>
            ) : (
              currentChat.map(msg => (
                <div key={msg.id} className={`message-wrapper ${msg.sender === 'me' ? 'sent' : 'received'}`}>
                  <div className={`message-bubble ${msg.sender === 'them' ? 'ai-bubble' : ''}`}>
                    {msg.sender === 'them' && msg.text !== 'Thinking...' ? (
                      <ReactMarkdown
                        components={{
                          h1: ({children}) => <h1 className="md-h1">{children}</h1>,
                          h2: ({children}) => <h2 className="md-h2">{children}</h2>,
                          h3: ({children}) => <h3 className="md-h3">{children}</h3>,
                          strong: ({children}) => <strong className="md-strong">{children}</strong>,
                          code: ({children}) => <code className="md-code">{children}</code>,
                          ul: ({children}) => <ul className="md-ul">{children}</ul>,
                          ol: ({children}) => <ol className="md-ol">{children}</ol>,
                          li: ({children}) => <li className="md-li">{children}</li>,
                          p: ({children}) => <p className="md-p">{children}</p>,
                        }}
                      >{msg.text}</ReactMarkdown>
                    ) : (
                      msg.text
                    )}
                  </div>
                  <div className="message-meta">
                    {msg.time} {msg.sender === 'me' && <CheckCheck size={14} color="#35858E" />}
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="chat-input-area" onSubmit={handleSendMessage}>
            <div className="input-container">
              <input 
                type="text" 
                placeholder={activeContact.type === 'ai' ? "Ask the AI Assistant..." : "Type a message..."}
                className="message-input"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <button type="submit" className="send-btn">
                <Send size={18} />
              </button>
            </div>
          </form>

        </div>
      ) : (
        <div className="no-chat-selected">
          <MessageSquare size={48} color="#cbd5e1" />
          <h3>Select a conversation</h3>
          <p>Choose a driver or the AI assistant to start chatting.</p>
        </div>
      )}

    </div>
  );
};

export default Messages;
