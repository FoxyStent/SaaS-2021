import '../styles/App.css';
import logo from '../logo192.png'
import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import axios from "axios";

const Login = () => {
    const hist = useHistory();

    const [loginData, setLoginData] = useState({
        username: "",
        password: ""
    })

    const [signUpData, setSignUpData] = useState({
        username: "",
        password: "",
        val_pass: "",
        name: "",
        email: "",
    })

    const [signUp, setSignUp] = useState(false);

    const [wrongPass, setWrongPass] = useState(false);

    const [wrongUser, setWrongUser] = useState(false);

    const [error, setError] = useState(false);

    const handleChange = e => {
        e.preventDefault()
        setWrongUser(false);
        setWrongPass(false)
        const {id, value} = e.target
        console.log(e.target.value)
        if (!signUp) {
            setLoginData(prevData => ({
                ...prevData,
                [id]: value
            }))
        }
        else {
            console.log('signup');
            setSignUpData(prevData => ({
                ...prevData,
                [id]: value
            }))
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (signUpData.val_pass === signUpData.password) {
            axios.post('https://saas16-ms-auth.herokuapp.com/user', signUpData)
                .then(function (res) {
                    console.log(res);
                    if (res.status === 200) {
                        localStorage.setItem('userLogged', signUpData.username);
                        localStorage.setItem('logged', true);
                        localStorage.setItem('access-token', res.data['access_token']);
                        hist.push('/')
                    }
                })
                .catch(function (res) {
                    if (res.response) {
                        if (res.response.status === 401) {
                            console.log(1);
                            setWrongPass(true);
                            console.log('Wrong Pass');
                        } else if (res.response.status === 409) {
                            console.log(2);
                            setWrongUser(true);
                            console.log('Wrong User');
                        }
                    } else {
                        setError(true);
                        console.log('Anoikse tous server bro');
                    }
                })
        }
        else
            setWrongPass(true);
    }

    const handleLogin = e => {
        e.preventDefault();
        console.log(loginData);
        axios.post('https://saas16-ms-auth.herokuapp.com/login', loginData)
        .then(function (res) {
            console.log(res);
            if (res.status === 200) {
                localStorage.setItem('userLogged', loginData.username);
                localStorage.setItem('logged', true);
                localStorage.setItem('access-token', res.data['access_token']);
                localStorage.setItem('refresh-token', res.data['refresh_token']);
                hist.push('/')
            }
        })
        .catch(res => {
            if (res.response) {
                console.log(res.request);
                if (res.response.status === 401) {
                    console.log(1);
                    setWrongPass(true);
                    console.log('Wrong Pass');
                } else if (res.response.status === 404) {
                    console.log(2);
                    setWrongUser(true);
                    console.log('Wrong User');
                }
            }
            else {
                setError(true);
                console.log('Anoikse tous server bro');
            }
        })
    }

    const handleClick = e =>{
        setWrongUser(false)
        setWrongPass(false)
        setError(false)
        if (e.target.id === "signup"){
            setSignUp(true);
        }
        if (e.target.id === 'cancel'){
            setSignUp(false);
        }
    }

    if (!signUp)
    return (
        <div className="container">

            <div className="row align-items-center justify-content-center border mt-5">
                <div className="col-auto">
                    <Link to={"/"}><img className={'col-1'} src={logo} style={{height:75, width:75}} alt={'Logo'}/></Link>
                </div>
                <div className="col-auto">
                    <h2>Join Ask me Anything!</h2>
                </div>
            </div>

            <div className={'mt-3'}>
                <div className={'shadow-lg w-50 m-auto p-4 rounded-3'}>
                    <form>
                        <div className="form-group">
                            <h5 className={"mb-2 mt-2"}>Username:</h5>
                            <input className={"form-control"} id={'username'} onChange={handleChange} placeholder={"Choose a Username"} type={"text"}/>
                        </div>

                        <div className="form-group">
                            <h5 className={"mb-2 mt-2"}>Password:</h5>
                            <input className={"form-control"} id={'password'} onChange={handleChange} placeholder={"Choose a Password"} type={"password"}/>
                        </div>

                        <div className="form-group">
                            <p className={"mb-2 mt-2"}>You don't have an account? <button className={'btn btn-link'} id={"signup"} onClick={handleClick}>Sign Up</button> </p>
                        </div>

                        <div className="form-group">
                            <p className={'alert alert-danger text-center'} hidden={!wrongPass}>Wrong Password</p>
                            <p className={'alert alert-danger text-center'} hidden={!wrongUser}>User not Found</p>
                        </div>
                    </form>

                    <div className={"row justify-content-center mt-3"}>
                        <div className="col-2">
                            <button className={'btn btn-primary'} onClick={handleLogin} type={"submit"}>Log In</button>
                        </div>
                        <div className="col-2">
                            <Link className={'btn btn-secondary'} id='cancel' to={"/"}>Cancel</Link>
                        </div>
                    </div>
                    <div className={"row justify-content-center mt-3"} >
                        <div hidden={!error} className="alert alert-danger">
                            <h2 className={'col'}>An unexpected error occurred.</h2>
                            <h2 className={'col'}>Contact system administration</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            )
    else
        return (
            <div className="container">

                <div className="row align-items-center justify-content-center border mt-5 bg-white">
                    <div className="col-auto">
                        <Link to={"/"}><img className={'col-1'} src={logo} style={{height:75, width:75}} alt={'Logo'}/></Link>
                    </div>
                    <div className="col-auto">
                        <h2>Join Ask me Anything!</h2>
                    </div>
                </div>

                <div className={'mt-3'}>
                    <div className={'shadow-lg w-50 m-auto p-4 rounded'}>
                        <form>
                            <div className="form-group">
                                <h5 className={"mb-2"}>Name:</h5>
                                <input className={"form-control"} id={'name'} onChange={handleChange} placeholder={"Enter your name"} type={"text"}/>
                            </div>

                            <div className="form-group">
                                <h5 className={"mb-2 mt-2"}>Username:</h5>
                                <input className={"form-control"} id={'username'} onChange={handleChange} placeholder={"Choose a Username"} type={"text"}/>
                            </div>

                            <div className="form-group">
                                <h5 className={"mb-2 mt-2"}>Password:</h5>
                                <input className={"form-control"} id={'password'} onChange={handleChange} placeholder={"Choose a Password"} type={"password"}/>
                            </div>

                            <div className="form-group">
                                <h5 className={"mb-2 mt-2"}>Validate Password:</h5>
                                <input className={"form-control"} id={'val_pass'} onChange={handleChange} placeholder={"Re-enter your Password"} type={"password"}/>
                            </div>

                            <div className="form-group">
                                <h5 className={"mb-2 mt-2"}>E-mail:</h5>
                                <input className={"form-control"} id={'email'} onChange={handleChange} placeholder={"Enter your e-mail"} type={"text"}/>
                            </div>

                            <div className="form-group">
                                <p className={'mt-2 alert alert-danger text-center'} hidden={!wrongPass}>Passwords don't match.</p>
                                <p className={'mt-2 alert alert-danger text-center'} hidden={!wrongUser}>Username is already used.</p>
                            </div>
                        </form>

                        <div className={"row justify-content-center mt-4"}>
                            <div className="col-3">
                                <button className={'btn btn-primary'} id={'submit'} onClick={handleSubmit} type={"submit"}>Sign Up</button>
                            </div>
                            <div className="col-2">
                                <button className={'btn btn-secondary'} id='cancel' onClick={handleClick} type={"submit"}>Cancel</button>
                            </div>
                        </div>

                        <div className={"row justify-content-center mt-3"} >
                            <div hidden={!error} className="alert alert-danger">
                                <h2 className={'col'}>An unexpected error occurred.</h2>
                                <h2 className={'col'}>Contact system administration</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
}

export default Login