import React,{ useState, useRef, useEffect } from 'react';

import './styles1.css';
import icon from '../../Images/logo2.png';

const ChatBot = () => {
    const [statement, setStatement] = useState('');

    const messageEl = useRef(null);
    const [messages, setMessages] = useState([]);

    const generateMessage = () => {
        // let message = null;
        fetch('/predict', {
            method: 'POST',
            body: JSON.stringify({ message: statement }),
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(r => r.json())
          .then(r => {
            console.log(r.response);
            // message=r.response;
            setMessages(prevMsg => [...prevMsg, r.response]);
            setStatement('');
        })
          .catch((error) => {
            console.log(`Error: ${error}`);
        });
        // return message;
    }

    const handleSend = (e) => {
        e.preventDefault();
        setMessages(prevMsg => [...prevMsg, statement]);
        generateMessage();
    }

    useEffect(() => {
        if (messageEl) {
        messageEl.current.addEventListener('DOMNodeInserted', event => {
            const { currentTarget: target } = event;
            target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
        });
        }
    }, [messages])

    // useEffect(() => {
    //     const generateDummyMessage = () => {
            
    //     }
    //     generateDummyMessage();
    // }, [statement]);
    
    return (
        <div id='ChatBot' className='chatBot'>
            <div className="chatHeader">
                <div>
                <img src={icon} alt="" />
                <div className="headerContent">
                    <h3>ChatBot</h3>
                    {/* <h4>Hi, My name is J.A.R.V.I.S. How can I help you?</h4> */}
                </div>
                </div>
                <div className="closeBtn" onClick={() => window.location= '/'}><h1>+</h1></div>
            </div>
            <div className="messages" ref={messageEl}>
                {messages.map((m, i) => <div key={i} className={`msg${i % 2 !== 0 ? '' : ' dark'}`}><h3>{m}</h3></div>)}
            </div>
            <div className="chatbox__footer">
                <input type="text" placeholder="Write a message..." value={statement} onChange={(e) => setStatement(e.target.value)} />
                <button className="chatbox__send--footer send__button" onClick={handleSend}>Send</button>
            </div>
        </div>
    )
}

export default ChatBot
