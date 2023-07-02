import React, { useEffect, useState } from 'react';
import { PrettyChatWindow } from 'react-chat-engine-pretty';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Chat = (props) => {
  const user = useSelector((state) => state.user);
  const [secret, setSecret] = useState(null);

  useEffect(() => {
    const fetchSecret = async () => {
      const res = await axios.get(`https://llbcknd.onrender.com/user/password/${user.id}`);
      const pass = res.data;
      console.log(pass);
      setSecret(pass);
    };

    fetchSecret();
  }, [user.id]);

  return (
    <div className='bg-[#282B36]'> 

      <h1 className='text-[#282B36]'> chat</h1>
      <div className='mt-[4rem] bg-slate-900 w-[100%] h-[100%]'>
      </div>
      <div style={{ height: '83vh', width: '100vw'}}>
        {secret && (
            <PrettyChatWindow
              projectId={process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID}
              username={user.name}
              secret={secret}
              style={{ height: '100%' }}
            />
        )}
      </div> 
    </div>
  );
};

export default Chat;


