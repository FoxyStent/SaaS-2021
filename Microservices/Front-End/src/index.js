import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import reportWebVitals from './reportWebVitals';
import Login from "./pages/Login";
import Main from './pages/Main';
import Ask from './pages/Ask';
import Question from './pages/Question';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

ReactDOM.render((
    <Router>
        <Switch>
            <Route exact path='/' component={Main} />
            <Route path='/login' component={Login} />
            <Route path='/askme' component={Ask} />
            <Route path='/question' component={Question} />
        </Switch>
    </Router>
), document.getElementById('root'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
