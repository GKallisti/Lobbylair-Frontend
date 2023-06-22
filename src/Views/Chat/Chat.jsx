import React, { useState } from 'react';
import GamesBar from '../../Components/GamesBar/GamesBar';
import './Chat.css';

  const Chat = () => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState('');
    const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleInputChange = event => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = event => {
    event.preventDefault();

    if (newMessage.trim() !== '') {
      const message = {
        id: Date.now(),
        content: newMessage,
      };

      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  
    const handlePostChange = event => {
      setNewPost(event.target.value);
    };
  
    const handlePostSubmit = event => {
      event.preventDefault();
  
      if (newPost.trim() !== '') {
        const newPostObj = {
          id: Date.now(),
          content: newPost,
        };
  
        setPosts([...posts, newPostObj]);
        setNewPost('');
      }
    };
  
    return (
      <div className="forum-container">
        <GamesBar />
        <div className="posts-container mt-4">
          <form onSubmit={handlePostSubmit} className="flex">
            <textarea
              value={newPost}
              onChange={handlePostChange}
              placeholder="Escribe tu post..."
              className="border border-gray-300 rounded-lg px-4 py-2 mr-2 w-full"
            />
            <button type="submit" className="bg-gray-800 text-white font-bold py-2 px-3 rounded-[2rem]">Post</button>
          </form>
          {posts.map(post => (
            <div key={post.id} className="post bg-gray-100 rounded-lg p-4 mt-4">
              <p>{post.content}</p>
            </div>
          ))}
        </div>
        <div className="chat-container">
      <div className="flex flex-col mt-5">
        {messages.map(message => (
          <div key={message.id} className="message">
            <p>{message.content}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={handleInputChange}
          placeholder="Escribe tu mensaje..."
          className="w-full bg-gray-300 py-5 px-3 rounded-xl"
        />
        <button type="submit" className="bg-gray-800 text-white font-bold py- px-3 rounded-[2rem]">Enviar</button>
      </form>
    </div>
      </div>
    );
  };
  
  export default Chat;