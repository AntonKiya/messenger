import React, {useReducer} from 'react';
import reducer from "./reducer";
import {ConnectionForm} from "./components/ConnectionForm";
import {Chat} from "./components/Chat";
import socket from "./socket";


function App() {

  const [state, dispatch] = useReducer(reducer, {
      roomId: null,
      userName: null,
      joined: false,
  });

  const onLogin = (payload) => {

      dispatch({
          type: 'JOINED',
          payload: {
              roomId: payload.roomId,
              userName: payload.userName,
              joined: true
          }
      })

      socket.emit('ROOM:JOIN', payload);
  }


  return (
    <div className="App">
      {state.isAuth ? <Chat /> : <ConnectionForm onLogin={onLogin}/>}
    </div>
  );
}

export default App;
