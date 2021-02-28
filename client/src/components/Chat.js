import React, {useState} from 'react';
import socket from "../socket";


export const Chat = ({state, newMessage}) => {

    const [input, setInput] = useState('');

    const send = () => {

        if (!input) return alert('Заполните поле');

        const message = {text: input, user: state.userName};

        socket.emit('NEW_MESSAGE', {text: input, userName: state.userName, roomId: state.roomId});

        newMessage(message);

        setInput('');

    }

    return(
        <div className="chat col-6">
            <div className="chat-users">
                <h3>{state.roomId}</h3>
                <hr/>
                <b>Онлайн: {state.users.length}</b>
                <ul>
                    {
                        state.users.map((item, id) => {
                            return <li key={item}>{item}</li>
                        })
                    }
                </ul>
            </div>
            <div className="chat-messages">
                <div className="messages">
                    {
                        state.messages.map((item, id) => {
                            return (
                                <div
                                    key={item.text}
                                    className="message mb-4"
                                >
                                    <p className={'w-100  btn-lg btn-primary mb-0'}>
                                        {item.text}
                                    </p>
                                    <data>{item.user}</data>
                                </div>
                            );
                        })
                    }
                </div>
                <form>
                    <textarea
                        rows='3'
                        cols='50'
                        value={input}
                        onChange={event => setInput(event.target.value)}
                    /><br/>
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={send}
                    >
                        Отправить
                    </button>
                </form>
            </div>
        </div>
    )
};
