import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

 
/**
 * whenever in the app there is an request log that request in console.
 */
axios.interceptors.request.use(request => {
    console.log(request);
    // return this request so that other functions can make also use of it.
    return request;
}, error => {
    console.log(error);
    // return this error so that other error handlers also can make use of it.
    return Promise.reject(error);
});
/**
 * whenever in the app there is an response log that response in console.
 */
axios.interceptors.response.use(response => {
    // console log the response
    console.log(response);
    // return the response so that other functions can also make use of it.
    return response;
}, error => {
    // console log the error.
    console.log(error);
    // return this error so that other error handlers also van make use of it.
    return Promise.reject(error);
});

// render the app to the DOM.
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
