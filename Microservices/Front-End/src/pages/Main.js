import '../styles/App.css';
import logo from '../logo192.png';
import React, {useState, useEffect } from "react";
import Footer from './Footer';
import { Bar } from 'react-chartjs-2';
import axios from "axios";
import {Link, NavLink, useHistory} from "react-router-dom";

const  Main = () => {
    const hist = useHistory();

    const [user, setUser] = useState(() =>{
        return (localStorage.getItem('userLogged') || "")
    });

    const [logged, setLogged] = useState(() => {
        return (localStorage.getItem('logged') || false)
    });

    const [titleSearch_question, setTitleSearchQuestions] = useState("nothing");
    const [keywords, setKeywords] = useState({names: [], vals: []})
    const [week, setWeek] = useState({names: [], vals: []})
    const [latest_questions, setQuestions] = useState([]);

    useEffect(() => {
        axios.get('https://saas16-ms-question-stats.herokuapp.com/keywords').then(res => {
            let names = []
            let values = []
            res.data.forEach(s => {
                names.push(s.name);
                values.push(s.count)
            });
            setKeywords({
                names: names,
                vals: values,
            })
        }).catch(e => {
            if (e.response) {
                setKeywords({
                    error: e
                })
            }
            else {
                setKeywords({
                    ...keywords,
                    error: 'Contact Administrator'
                })
            }
        })

        axios.get('https://saas16-ms-question-stats.herokuapp.com/week').then(res => {
            const today = new Date();
            let days = []
            let values = []
            Object.values(res.data).forEach(s => {
                values.push(s);
                days.push(today.toLocaleDateString('en-US', {weekday: 'long'}))
                today.setDate(today.getDate()-1);
            })

            setWeek({
                names: days,
                vals: values,
            })
        }).catch(e => {
            if (e.response) {
                setWeek({
                    ...week,
                    error: e.response
                })
            }
            else {
                setWeek({
                    error: 'Contact Administrator'
                })
            }
            })

        axios.get('https://saas16-ms-question-stats.herokuapp.com/previews/latest').then(res => {
            setQuestions(res.data)
        }).catch(e => {
            if (e.response) {
                setQuestions({
                    error: e.response
                })
            }
            else {
                setQuestions({
                    error: 'Contact Administrator'
                })
            }
        })
    }, [])


    const data = {
        labels: keywords.names,
        datasets: [
            {
                label: '# of Votes',
                data: keywords.vals,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(237,178,188,1)',
                ],
                borderWidth: 1,
            },
        ],
    }

    const week_data = {
        labels: week.names,
        datasets: [
            {
                label: '# of Questions',
                data: week.vals,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(237,178,188,1)',
                ],
                borderWidth: 1,
            },
        ],
    }
    const opts = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    }

    const handleTitChange = e =>{
        e.preventDefault();
        const {id, value} = e.target;
        if (value.length > 2)
            axios.get("https://saas16-ms-question-creator.herokuapp.com/question/title/"+value).then(res => {
                    setTitleSearchQuestions(res.data)
                }
            ).catch(e => {
            })
        else
            setTitleSearchQuestions("nothing");
    }

    const logout = e =>{
        axios.post({
            url: 'https://saas16-ms-auth.herokuapp.com/',
            headers: {
                'X-REFRESH': localStorage.getItem('refresh-token'),
            },
        })
        localStorage.removeItem('userLogged');
        localStorage.removeItem('access-token');
        localStorage.removeItem('refresh-token');
        localStorage.setItem('logged', false);
        hist.go(0)
        setLogged(false);
        setUser("");
    }

    return (
        <div>
            <div role={'navigation'} className={"navbar justify-content-around navbar-light bg-light shadow-sm"}>
                <Link to={"/"}><img className={'col-1'} src={logo} style={{height:75, width:75}} alt={'Logo'}/></Link>
                <h1 className={'col-10 text-center'}>Ask me Anything!</h1>
                <div className={"d-grid gap-1 col-1 me-3"}>
                    <Link hidden={user === ""} className={'btn btn-primary'}>My Profile</Link>
                    <button hidden={user === ""} onClick={logout} className={'btn btn-primary'}>Log Out</button>
                    <Link hidden={user !== ""} to={"/login"} className={'btn btn-primary'}>Log In</Link>
                </div>
            </div>

            <div className={'container pb-5'}>
                <div className="row mb-5">
                    <div className="col mt-4">
                        <div className={'mb-3'}>
                            <h3>Questions per keyword</h3>
                        </div>
                        <div hidden={keywords.hasOwnProperty('error')} className={'mb-3'}>
                            <Bar  data={data} options={opts}/>
                        </div>
                        <div hidden={!keywords.hasOwnProperty('error')} className={'mb-3'}>
                            <h2 className={'alert alert-danger'}>An error occurred</h2>
                        </div>
                    </div>

                    <div className="col mt-4">
                        <div className={'mb-3'}>
                            <h3>Questions per keyword</h3>
                        </div>
                        <div hidden={week.hasOwnProperty('error')} className={'mb-3'}>
                            <Bar  data={week_data} options={opts}/>
                        </div>
                        <div hidden={!week.hasOwnProperty('error')} className={'mb-3'}>
                            <h2 className={'alert alert-danger'}>An error occurred</h2>
                        </div>
                    </div>
                </div>
                <div className="row mb-5">
                    <div className="col mt-4">
                        <h3>Search a Question</h3>
                        <div className={'mb-3'}>
                            <input className={'form-control'} onChange={handleTitChange} placeholder={"Title"}/>
                        </div>
                        {titleSearch_question!=="nothing" && titleSearch_question.map(item => {
                            return(
                                <div className={'row border justify-content-start'}>
                                    <NavLink className={'fs-2'} to={{pathname: '/question', state: { id: item['qId']}}}>{item['title']}</NavLink>
                                    <text>{item['text']}</text>
                                </div>
                            )
                        })}
                        <h3>If this didn't help</h3>
                        <div>
                            <Link to={"/askme"} className={'btn btn-primary mt-2'}>Go and Ask</Link>
                        </div>
                    </div>

                    <div className="col mt-4">
                        <h3>Answer a Question</h3>

                        {!latest_questions.hasOwnProperty('error') && latest_questions.map(item =>{
                            return(
                                <div className={'row border justify-content-start'}>
                                    <NavLink className={'fs-2'} to={{pathname: '/question', state: { id: item['qId']}}}>{item['title']}</NavLink>
                                    <text>{item['text']}</text>
                                    <text>{item['keywords'].join(', ')}</text>
                                </div>
                                )
                            })
                        }
                        <div hidden={!week.hasOwnProperty('error')} className={'mb-3'}>
                            <h2 className={'alert alert-danger'}>An error occurred</h2>
                        </div>
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    )

}

export default Main;