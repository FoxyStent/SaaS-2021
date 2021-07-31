import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import reportWebVitals from './reportWebVitals';
import Login from "./pages/Login";
import Main from './pages/Main';
import Ask from './pages/Ask';
import Question from './pages/Question';
import axios from "axios";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

const refreshAccessToken = () => {
    const ref = localStorage.getItem('refresh_token');
    axios.post({
            url: 'https://saas16-ms-auth.herokuapp.com/refresh',
            headers: {'X-REFRESH': ref}
        }).then(res => {
        localStorage.setItem('access-token', res.data['access_token']);
        localStorage.setItem('refresh-token', res.data['refresh_token']);
    })
    return localStorage.getItem('access-token');
}

axios.interceptors.request.use(async config => {
    const token = localStorage.getItem('access-token');
    config.headers = {
        ...config.headers,
        'authorization': `Bearer ${token}`
    }
    console.log(config);
    return config;
    }, error => {
    Promise.reject(error)
})

axios.interceptors.response.use(response => {
    return response
}, async function (error) {
    const originalRequest = error.config;
    console.log(error.response);
    if (error.response.status === 401 && error.response.data['message'] === 'ExpiredAccess' &&!originalRequest._retries){
        originalRequest._retries = true;
        console.log(originalRequest);
        const new_token = await refreshAccessToken()
        originalRequest.headers['authorization'] = `Bearer ${new_token}`;
        return axios(originalRequest);
    }
    else if(error.response.status === 401 && error.response.data['message'] !== 'ExpiredRefresh' &&!originalRequest._retries){

    }
})

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
