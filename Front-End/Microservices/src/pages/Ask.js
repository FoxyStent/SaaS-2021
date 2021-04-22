import '../styles/App.css';
import logo from '../logo192.png';
import React, {useState} from "react";
import Footer from './Footer';
import {Link} from "react-router-dom";

const  Ask = () => {
    const [user, setUser] = useState(() =>{
        return (localStorage.getItem('userLogged') || "")
    });

    const [logged, setLogged] = useState(() => {
        return (localStorage.getItem('logged') || false)
    });

    return (
        <div>
            <div role={'navigation'} className={"navbar justify-content-around navbar-light bg-light shadow-sm"}>
                <img className={'col-1'} src={logo} style={{height:75, width:75}} alt={'Logo'}/>
                <h1 className={'col-10 text-center'}>Ask me Anything!</h1>
                <div className={"d-grid gap-1 col-1 me-3"}>
                    <Link className={'btn btn-primary'}>My Profile</Link>
                </div>
            </div>

            <div>
                <div className="row justify-content-center align-items-center mt-5">
                    <label className={"text-end ms-4 col-1"}>Question Title</label>
                    <input className={"col-9 ms-2"} id={'Question'} placeholder={"Your Question's Title"}/>
                </div>

                <div className="row justify-content-center align-items-start mt-4">
                    <label className={"text-end ms-4 col-1"}>Password</label>
                    <textarea className={"col-9 ms-2"} id={'question'}  placeholder={"Your Question"} type={"text"}/>
                </div>

                <div className="row justify-content-center align-items-start mt-4">
                    <label className={"text-end ms-4 col-1"}>Keywords</label>
                    <input className={"col-9 ms-2"} id={'keywords'}  placeholder={"Keywords"} type={"text"}/>
                </div>-

                <div className="row justify-content-center align-items-center mt-5">
                    <button className={'col-2 btn btn-primary'}  type={"submit"}>Submit</button>
                    <Link className={'ms-4 col-2 btn btn-secondary'} id='cancel' to={"/"}>Cancel</Link>
                </div>
            </div>

        </div>
            )
}

export default Ask;