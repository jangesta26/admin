'use client'
import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const ChatPage = () => {
    const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'bot' }[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
  
    useEffect(() => {
      scrollToBottom();
    }, [messages]);
  
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
  
    const handleSendMessage = () => {
      if (inputMessage.trim() === '') return;
  
      // Add user message to the chat
      setMessages([...messages, { text: inputMessage, sender: 'user' }]);
      setInputMessage('');
  
      // Mock response after a short delay (simulating AI processing)
      setTimeout(() => {
        setMessages([...messages, { text: 'This is a mock response.', sender: 'bot' }]);
      }, 1000);
    };
  
    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault(); // Prevents adding a newline (default behavior of Enter in a textarea)
        handleSendMessage();
      }
    };


    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
          textarea.style.height = 'auto';
          textarea.style.height = `${textarea.scrollHeight}px`;
        }
      };

      useEffect(() => {
        adjustTextareaHeight();
      }, [inputMessage]);
  
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Head>
          <title>ChatDoc AI - Your Health Assistant</title>
        </Head>
        <h1 className="text-3xl font-bold text-center mb-8">ChatDoc AI - Your Health Assistant</h1>
  
        <div className="border border-gray-300 rounded-lg p-4 mb-8 overflow-y-scroll" style={{ height: '400px', scrollbarWidth: 'none' }}>
          {messages.map((msg, index) => (
            <div key={index} className={`mb-2 text-${msg.sender === 'user' ? 'right' : 'left'} `}>
              <span className={`inline-block rounded-lg p-2 ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                {msg.text}
              </span>
            </div>
          ))}
          <div className='bg-blue-500' ref={messagesEndRef} />
        </div>
  
        <div className="grid w-full gap-2">
          <Textarea
           ref={textareaRef}
            placeholder="Type your message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 mr-2 p-2 border border-gray-300 rounded-lg resize-none overflow-hidden"
            rows={2} // Optional: Set initial number of rows
          />
          <Button onClick={handleSendMessage} className="px-4 bg-blue-500 text-white rounded-lg">Send message</Button>
        </div>
      </div>
    );
  };
  
  export default ChatPage;