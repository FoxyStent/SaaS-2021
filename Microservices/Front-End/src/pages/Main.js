import '../styles/App.css';
import logo from '../logo192.png';
import React, {useState, useEffect } from "react";
import Footer from './Footer';
import { Bar } from 'react-chartjs-2';
import axios from "axios";
import {Link, NavLink} from "react-router-dom";

const  Main = () => {
    const [user, setUser] = useState(() =>{
        return (localStorage.getItem('userLogged') || "")
    });

    const [logged, setLogged] = useState(() => {
        return (localStorage.getItem('logged') || false)
    });

    const [keywords, setKeywords] = useState({names: [], vals: []})
    const [week, setWeek] = useState({names: [], vals: []})
    const [latest_questions, setQuestions] = useState([]);

    console.log('keyword: ' + keywords.hasOwnProperty('error'))
    console.log('week: '+ week.hasOwnProperty('error'))
    console.log('question: '+ latest_questions)

    useEffect(() => {
        axios.get('http://localhost:3040/keywords').then(res => {
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
            console.log('called keywords')
        }).catch(e => {
            console.log('caught keywords')
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

        axios.get('http://localhost:3040/week').then(res => {
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
            console.log('caught week')
            if (e.response) {
                console.log('Week Error')
                setWeek({
                    ...week,
                    error: e.response
                })
            }
            else {
                console.log('else')
                setWeek({
                    error: 'Contact Administrator'
                })
            }
            })

        axios.get('http://localhost:3040/previews/latest').then(res => {
            setQuestions(res.data)
        }).catch(e => {
            console.log('caught latest')
            if (e.response) {
                console.log('Question Error')
                setQuestions({
                    error: e.response
                })
            }
            else {
                console.log('else')
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

    const logout = e =>{
        localStorage.removeItem('userLogged');
        localStorage.removeItem('access-token');
        localStorage.setItem('logged', false);
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
                        <h3>Ask a new Question</h3>
                        <div className={'mb-3'}>
                            <input className={'form-control input-xs'} placeholder={"Your Question"}/>
                        </div>
                        <div className={'mb-3'}>
                            <input className={'form-control'} placeholder={"Keywords"}/>
                        </div>
                        <div>
                            <p>Pws na mathw react</p>
                            <p>Question About Soa</p>
                        </div>

                        <div>
                            <Link to={"/askme"} className={'btn btn-primary'}>Go and Ask</Link>
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