import React, { useEffect, useState } from 'react';
import "./chat.css"

const Chat = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes(),
      };
      await socket.emit('send_message', messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage(''); // Clear the input field after sending the message
    }
  };

  useEffect(() => {
    // debugger 
    if(socket){
        socket.on('receive_message', (data) => {
            // debugger 
         setMessageList((list) => {
           // debugger 
           return [...list, data]
         });
       });
    }

    return () => {
        // Unmounut 
    }
  }, [socket]);

  return (
    <div>
      <div className="header">
        <p>Live Chat</p>
      </div>

      <div className="body">
        {messageList.map((messageContent, index) => (
          <div key={index} id={username === messageContent.author ? 'you' : 'other'}>
            <div>
              <h1>{messageContent.message}</h1>
            </div>
            <div>
              <h6>{messageContent.author}</h6>
              <h6>{messageContent.time}</h6>
            </div>
          </div>
        ))}
      </div>

      <div className="footer">
        <input
          type="text"
          placeholder="Type your message"
          value={currentMessage}
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
