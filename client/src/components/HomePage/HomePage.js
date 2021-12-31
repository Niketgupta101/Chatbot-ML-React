import React,{ useEffect } from "react";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import "./styles.css";
import bot from "../../Images/hiBot1.png";

const HomePage = () => {

  const store = useSelector(state => state.Vars);
  const dispatch = useDispatch();
  console.log(store);

  const handleChatbot = () => {
        fetch('/instantiate', {
            method: 'POST',
            body: JSON.stringify({ id: store.dataId,path: "./Data/hyperparams.json" }),
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(r => console.log(r))
          .catch((error) => {
            console.log(`Error: ${error}`);
        });
      window.location = '/chatbot'
  }
  const demoBot = () => {
    fetch('/instantiate', {
      method: 'POST',
      body: JSON.stringify({ id: store.dataId,path: "./DemoBot/hyperparams.json" }),
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(r => console.log(r))
    .catch((error) => {
      console.log(`Error: ${error}`);
  });
window.location = '/chatbot'
  }

  // if(store.isTrained === false)
  // {
  //   document.getElementById('chat').disabled = true;
  // }
  // else
  // {
  //   document.getElementById('chat').disabled = false;
  // }

  return (
    <div className="content">
      <div className="left-content">
        <h1>Welcome to our ChatBot</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. In amet
          tenetur aut recusandae corrupti assumenda tempora enim, eaque maiores,
          totam quas accusantium eligendi, debitis sequi odit at neque sint
          magni.
        </p>
        <h4>
          Would you please spare some time to provide some information to help
          the bot answer more efficiently
        </h4>

        <div className="customContent">
        <h2 className="topic">Take a Demo</h2>
        <button className="btn-primary" onClick={demoBot}>Demo Bot</button>
        </div>

        <h2 className='topic'>Make your custom bot</h2>
        <div className="custom">
        <div className="customContent">
        <h3>Step 1 : Create a Dataset.</h3>
        <button className="btn-primary" onClick={() => window.location='/Questionaire'}>Create Dataset</button>
        </div>
        <div className="customContent">
        <h3>Step 2 : Train Model (Necessary before chatting)</h3>
        <button className="btn-primary" onClick={() => window.location='/trainModel'}>Train Model</button>
        </div>
        <div className="customContent">
        <h3>Step 3 : Let's Start Chatting</h3>
        <button className="btn-primary" id="chat" onClick={handleChatbot}>Let's Chat</button>
        </div>
        </div>

      </div>
      <div className="right-content">
        <Link to='/chatbot'><img src={bot} alt="" /></Link>
      </div>
    </div>
  );
};

export default HomePage;
