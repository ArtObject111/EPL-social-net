import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import state, {subscribe} from "./redux/state";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {addPost, updateNewPostText, sendMessage, updateNewMessageText} from "./redux/state";

// addPost("I'm Arsenal's player!");

const root = ReactDOM.createRoot(document.getElementById('root'));
let rerenderEntireTree = (state) => {
    root.render(
        // <React.StrictMode> тег - выполняет рендеринг компонентов дважды, чтобы обнаружить любые проблемы
        //    кодом и предупредить о них (рекомендуется на стадии dev, но отключается на стадии production)
        <BrowserRouter>
            <App state={state}
                 addPost={addPost}
                 updateNewPostText = {updateNewPostText}
                 sendMessage = {sendMessage}
                 updateNewMessageText = {updateNewMessageText}
            />
        </BrowserRouter>
        // </React.StrictMode>
    )
};

rerenderEntireTree(state);

subscribe(rerenderEntireTree);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
