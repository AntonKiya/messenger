import React, {useState} from 'react';
import axios from "axios";
import socket from "../socket";


export const ConnectionForm = ({onLogin}) => {


    const [form, setForm] = useState({
        roomId:'', userName: ''
    });

    const send = async () => {

        if (!form.roomId || !form.userName) return alert('Заполните все поля!');

        await axios.put( 'http://localhost:5000/rooms', {form});

        onLogin(form);


    }


    return(
        <div>
            <div className="col-sm-6">
                <h5 className="form-label">Room id</h5>
                <input
                    type="text"
                    className="form-control"
                    name="roomId" id="roomId"
                    placeholder="Room ID"
                    value={form.roomId}
                    onChange={(event) => setForm({...form, [event.target.name]:event.target.value})}
                />
            </div>
            <div className="col-sm-6">
                <h5 className="form-label">First name</h5>
                <input
                    type="text"
                    className="form-control"
                    name="userName"
                    placeholder="Name"
                    id="userName"
                    value={form.userName}
                    onChange={(event) => setForm({...form, [event.target.name]:event.target.value})}
                />
            </div>
            <button onClick={send} type="button" className="btn btn-success">Send</button>
        </div>
    );
};
