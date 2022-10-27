import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import store from "./redux/state";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";

// addPost("I'm Arsenal's player!");

const root = ReactDOM.createRoot(document.getElementById('root'));
let rerenderEntireTree = (state) => {
    root.render(
        // <React.StrictMode> тег - выполняет рендеринг компонентов дважды, чтобы обнаружить любые проблемы
        //    кодом и предупредить о них (рекомендуется на стадии dev, но отключается на стадии production)
        <BrowserRouter>
            <App state={state}
                 dispatch={store.dispatch.bind(store)}
                 /*addPost = {} updateNewPostText = {store.updateNewPostText.bind(store)}
                 sendMessage = {store.sendMessage.bind(store)}
                 updateNewMessageText = {store.updateNewMessageText.bind(store)}*/
            />
        </BrowserRouter>
        // </React.StrictMode>
    )
};

rerenderEntireTree(store.getState());//отсюда берем state для функции rerenderEntireTree

store.subscribe(rerenderEntireTree);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
