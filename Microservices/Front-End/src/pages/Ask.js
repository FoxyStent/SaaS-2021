import '../styles/App.css';
import logo from '../logo192.png';
import React, {useState} from "react";
import Footer from './Footer';
import {Link, useHistory} from "react-router-dom";
import axios from "axios";

const  Ask = () => {
    const hist = useHistory();

    const [error, setError] = useState(false);
    const [user, setUser] = useState(() =>{
        return (localStorage.getItem('userLogged') || "")
    });

    const [logged, setLogged] = useState(() => {
        return (localStorage.getItem('logged') || false)
    });

    const [question, setQuestion] = useState({
        username: user,
        title: "",
        text: "",
        keywords: [],
        }
    )

    const handleChange = e => {
        e.preventDefault()
        const {id , value} = e.target
        if (e.target.id !== 'keywords')
            setQuestion(prevData => ({
                ...prevData,
                [id] : value
            }))
        else {
            const keys = e.target.value.split(',');
            setQuestion(prevData => ({
                ...prevData,
                keywords: keys
            }))
        }
        console.log(question);
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log(question);
        axios.post('https://saas16-ms-question-creator.herokuapp.com/question', question)
            .then(function (res) {
                console.log(res);
                hist.push("/question", {id: res.data.qId})
            }).catch(e => {
                setError(true);
        })
    }

    return (
        <div>
            <div role={'navigation'} className={"navbar justify-content-around navbar-light bg-light shadow-sm"}>
                <Link to={"/"}><img className={'col-1'} src={logo} style={{height:75, width:75}} alt={'Logo'}/></Link>
                <h1 className={'col-10 text-center'}>Ask me Anything!</h1>
                <div className={"d-grid gap-1 col-1 me-3"}>
                    <Link hidden={user === ""} className={'btn btn-primary'}>My Profile</Link>
                    <Link hidden={user !== ""} to={"/login"} className={'btn btn-primary'}>Log In</Link>
                </div>
            </div>
            <div className={'container pb-5'}>
                <div>
                    <div className="row justify-content-center align-items-center">
                        <div className={'col-5 mt-4'}>
                            <h6 hidden={!error} className={'text-center alert alert-danger'}>You have to be logged in to ask a question. <Link to={'/login'}>Log In</Link> and try again</h6>
                        </div>
                    </div>
                    <div className={'shadow-lg w-75 m-auto p-4'}>
                        <form>
                            <div className="form-group">
                                <h5 className={"mb-2 mt-3"}>Question Title</h5>
                                <input className={"form-control"} id={'title'} onChange={handleChange} placeholder={"Your Question's Title"}/>
                            </div>

                            <div className="form-group">
                                <h5 className={"mb-2 mt-2"}>Your Question</h5>
                                <textarea rows={10} className={"form-control"} id={'text'} onChange={handleChange} placeholder={"Your Question"}/>
                            </div>

                            <div className="form-group">
                                <h5 className={"mb-2 mt-2"}>Keywords</h5>
                                <input className={"form-control"} id={'keywords'} onChange={handleChange} placeholder={"Keywords"} type={"text"}/>
                            </div>
                        </form>

                        <div className="row justify-content-center align-items-center mt-4">
                            <div className={"col-auto"}>
                                <button className={'btn btn-primary'} onClick={handleSubmit}>Submit</button>
                            </div>
                            <div className={"col-auto"}>
                                <Link className={'btn btn-secondary'} id='cancel' to={"/"}>Cancel</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            )
}

export default Ask;