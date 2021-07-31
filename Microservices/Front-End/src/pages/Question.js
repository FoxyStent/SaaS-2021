import '../styles/App.css';
import logo from '../logo192.png';
import React, {useState, useEffect} from "react";
import {Link, useHistory, useLocation} from "react-router-dom";
import axios from "axios";

const  Question = () => {
    const loc = useLocation();
    const hist = useHistory();
    console.log(loc.state);
    const question_id = loc.state['id'];

    const [error, setError] = useState(false);
    const [user, setUser] = useState(() =>{
        return (localStorage.getItem('userLogged') || "")
    });

    const [question, setQuestion] = useState({keywords: [], answers: []});
    const [answer, setAnswer] = useState({
        qid: question_id,
        username: user,
    });

    const handleChange = e => {
        e.preventDefault();
        const {id, value} = e.target;
        setAnswer(prevData => ({
            ...prevData,
            [id]: value
        }))
        console.log(answer)
    }

    const handlePost = e => {
        e.preventDefault();
        axios.post('https://saas16-ms-answer-creator.herokuapp.com/answer', answer).then(res => {
            if (res.status === 201)
                hist.go(0);
        }).catch(e => {
            setError(true);
        })
        console.log(answer)
        console.log('posted')
    }

    useEffect(() => {
        console.log('Request sent');
        axios.get('https://saas16-ms-question-stats.herokuapp.com/preview/' + question_id).then(res => {
            console.log(res.data);
            setQuestion(res.data);
        }).catch(e => {
            if (e.response) {
                setQuestion({
                    error: e.response
                })
            } else {
                setQuestion({
                    error: 'Contact Administrator'
                })
            }
        })
    }, [])



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

            <div className={'container pb-auto'}>

                <div className="row justify-content-center align-items-center">
                    <div className={'col-5 mt-4'}>
                        <h6 hidden={!error} className={'text-center alert alert-danger'}>Something went wrong when posting your answer. Try again later</h6>
                    </div>
                </div>

                <div className="justify-content-start align-items-center mt-5">
                    <h2 className={'ms-4'}>{question['title']}</h2>
                    <p className={'ms-4'}>Keywords: {question['keywords'].join(', ')}</p>
                    <p className={'ms-4'}>Asked on: {new Date(question['createdAt']).toLocaleDateString('en-GB', { weekday: 'long', year:'numeric', month: 'numeric', day:'numeric'})}</p>
                </div>

                <div className="justify-content-center align-items-start mt-4 border-top">
                    <p className={'col'}>{question['text']}</p>
                </div>

                <div className="justify-content-start align-items-center mt-5">
                    <h5 className={'ms-4 pb-5'}>Answers</h5>
                </div>

                {question['answers'].map(ans => {
                    return(
                        <div>
                            <div className="row justify-content-center align-items-start text-center mt-4 border-top">
                                <p className={'col-5'}>{ans['text']}</p>
                            </div>

                            <div className="justify-content-start align-items-center text-end mt-5">
                                <p className={'me-4'}>Answered by: {ans['username'] || "Anonymous"},</p>
                                <p className={'me-4'}>on {new Date(ans['createdAt']).toLocaleDateString('en-GB', { weekday: 'long', year:'numeric', month: 'numeric', day:'numeric'})}</p>
                            </div>
                        </div>
                    )
                })}

                <div className="justify-content-start align-items-center mt-5 border-top">
                    <h5 className={'ms-4'}>Your Answer</h5>
                </div>

                <div className="justify-content-center align-items-center mt-5">
                    <div className={'col'}>
                        <textarea id={'text'} placeholder={'Type your Answer'} rows={10} cols={92} onChange={handleChange}/>
                    </div>
                </div>
                <div className="justify-content-center align-items-center mt-3 pb-5">
                    <div className={'col'}>
                        <button className={'btn btn-primary'} onClick={handlePost}>Post your Answer</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Question;