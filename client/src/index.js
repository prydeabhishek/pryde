import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {  Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import 'font-awesome/css/font-awesome.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css'; 
import history from './history';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Provider store={store}><Router history={history}><App /></Router></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
