import React, {useReducer, useEffect} from 'react';
import reducer from "./reducer";
import {ConnectionForm} from "./components/ConnectionForm";
import {Chat} from "./components/Chat";
import socket from "./socket";
import axios from "axios";


function App() {

  const [state, dispatch] = useReducer(reducer, {
      roomId: null,
      userName: null,
      joined: false,
      users: [],
      messages: []
  });

  const onLogin = async (payload) => {

      dispatch({
          type: 'USER_JOINED',
          payload: {
              roomId: payload.roomId,
              userName: payload.userName,
              joined: true
          }
      });


      socket.emit('ROOM_JOIN', payload);

      const usersMess = await axios.get( `http://localhost:5000/rooms/${payload.roomId}`);

      const oldMessages = usersMess.data.messages;

      dispatch({
          type: 'OLD_MESSAGES',
          payload: oldMessages
      });

  }

  const newMessage = (message) => {

      dispatch({
          type: 'SET_MESSAGES',
          payload: message
      });
  };

    useEffect(() => {

        socket.on('SET_USERS', users => {
            dispatch({
                type: 'SET_USERS',
                payload: users
            })
        });

        socket.on('SET_MESSAGES', message => {
            dispatch({
                type: 'SET_MESSAGES',
                payload: message
            })
        });

    }, []);


  return (
    <div className="App">
      {state.joined ? <Chat state={state} newMessage={newMessage} /> : <ConnectionForm onLogin={onLogin} />}
    </div>
  );
}

export default App;
