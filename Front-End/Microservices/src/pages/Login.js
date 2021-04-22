import '../styles/App.css';
import logo from '../logo192.png'
import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";

const Login = () => {
    const hist = useHistory();

    const [loginData, setLoginData] = useState({
        username: "",
        password: ""
    })

    const [signUp, setSignUp] = useState(false);

    const handleChange = e => {
        e.preventDefault()
        const {id , value} = e.target
        setLoginData(prevData => ({
            ...prevData,
            [id] : value
        }))
    }

    const handleLogin = e => {
        e.preventDefault();
        console.log(loginData);
        if (loginData.username === 'admin' && loginData.password === 'admin'){
            localStorage.setItem('logged', true);
            localStorage.setItem('userLogged', loginData.username);
            hist.push("/");
        }
    }

    const handleClick = e =>{
        if (e.target.id === "signup"){
            setSignUp(true);
        }
        if (e.target.id === 'cancel'){
            setSignUp(false);
        }
    }

    return (
        <div className="container">

            <div className="row justify-content-start align-items-center border mt-5">
                <div className="col-5">
                    <img src={logo} style={{width:75, height:75}} alt={"Logo"}/>
                </div>
                <div className="col-5">
                    <h2>Ask me Anything!</h2>
                </div>
            </div>

            {!signUp && (
                <div>
                    <div className="row justify-content-center align-items-center mt-5">
                        <div className="col">
                            <label className={"me-2"}>Username:</label>
                            <input id={'username'} value={loginData.username} onChange={handleChange}
                                   placeholder={"Your Username"}/>
                        </div>
                    </div>

                    <div className="row justify-content-center align-items-center mt-3">
                        <div className="col">
                            <label className={"me-2"}>Password:</label>
                            <input id={'password'} value={loginData.password} onChange={handleChange} placeholder={"Your Password"} type={"password"}/>
                        </div>
                    </div>

                    <div className="row justify-content-center align-items-center mt-5">
                        <div className="col">
                            <button className={'btn btn-primary'} onClick={handleLogin} type={"submit"}>Log In</button>
                            <button className={'ms-4 btn btn-secondary'} id='signup' onClick={handleClick} type={"submit"}>Don't have account?</button>
                            <Link className={'ms-4 btn btn-secondary'} id='cancel' to={"/"}>Cancel</Link>
                        </div>
                    </div>
                </div>
            )}

            {signUp && (
                <div>
                    <div className="row justify-content-center align-items-center mt-3">
                        <div className="col-2">
                            <label className={"me-2"}>Username:</label>
                        </div>
                        <div className="col-1">
                            <input placeholder={"Choose a Username"} type={"password"}/>
                        </div>
                    </div>

                    <div className="row justify-content-center align-items-center mt-3">
                        <div className="col-2">
                            <label className={"mr-5"}>Password:</label>
                        </div>
                        <div className="col-1">
                            <input placeholder={"Choose a Password"} type={"password"}/>
                        </div>
                    </div>

                    <div className="row justify-content-center align-items-center mt-3">
                        <div className="col-2">
                            <label>Validate Password:</label>
                        </div>
                        <div className="col-1">
                            <input placeholder={"Re-enter your Password"} type={"password"}/>
                        </div>
                    </div>

                    <div className="row justify-content-center align-items-center mt-3">
                        <div className="col-2">
                            <label className={"me-2"}>E-mail:</label>
                        </div>
                        <div className="col-1">
                            <input placeholder={"Enter your e-mail"} type={"password"}/>
                        </div>
                    </div>

                    <div className="row justify-content-center align-items-center mt-5">
                        <div className="col">
                            <button className={' btn btn-primary'} type={"submit"}>Sign Up</button>
                            <button className={'ms-4 btn btn-secondary'} id='cancel' onClick={handleClick} type={"submit"}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )

}

export default Login