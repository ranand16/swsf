import React, { useState } from "react";
import { useSocket } from "./context/SocketProvider";

const App: React.FC = () => {
    const { sendMessage, messages } = useSocket();
    const [message, setMessage] = useState("");
    return (
        <div className="">
            <div>
                <input
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter message here..."
                    value={message}
                />
                <button onClick={(e) => sendMessage(message)}>Send</button>
            </div>
            <div>
                <h1>All messages will appear here.</h1>
            </div>
            <div>
                {messages.map((msg) => (
                    <li>
                        {msg["sender"]} {msg["message"]}
                    </li>
                ))}
            </div>
        </div>
    );
};

export default App;
