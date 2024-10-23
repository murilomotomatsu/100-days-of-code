import { useEffect, useState } from 'react'
import './ChatContainer.css'
import { getMessage } from '../../services/gpt-services';



//Chat Container
export default function ChatContainer() {
    const [messages, setMessages] = useState([]);
    const [textInput, setTextInput] = useState('');

    useEffect(() => {
        setMessages([{ sender: 'gpt', text: 'Welcome! Ask me anything' }]);
    }, [])

    const sendMessage = async () => {
        setMessages([...messages, { sender: 'user', text: textInput}]);
        setTextInput('');

        const response = await getMessage(textInput);
        setMessages((prev) => [...prev, { sender: 'gpt', text: response}])


    }

    return (

        <div className="chat-container">
            <div className="messages-container">
                {messages.map((msg, i) => (
                    <div key={i} className={`message ${msg.sender}`}>
                        <p>
                            {msg.text}
                        </p>
                    </div>
                ))}


            </div>
            <div className="input-container">
                <input
                    type="text"
                    placeholder='Type a text'
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    onKeyDown={(e) => {if (e.key === 'Enter') {sendMessage()}}}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}