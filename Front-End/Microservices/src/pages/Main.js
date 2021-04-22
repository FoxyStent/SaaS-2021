import '../styles/App.css';
import logo from '../logo192.png';
import React, {useState} from "react";
import Footer from './Footer';
import { Bar } from 'react-chartjs-2';
import Login from "./Login";
import {Link} from "react-router-dom";

const  Main = () => {
    const [user, setUser] = useState(() =>{
        return (localStorage.getItem('userLogged') || "")
    });

    const [logged, setLogged] = useState(() => {
        return (localStorage.getItem('logged') || false)
    });

    const data = {
        labels: ['react', 'express', 'q2a', 'soa', 'microservices', 'soa', 'haskell'],
        datasets: [
            {
                label: '# of Votes',
                data: [23, 22, 19, 18, 12, 9, 3],
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
        localStorage.setItem('logged', false);
        setLogged(false);
        setUser("");
    }

    return (
        <div>
            <div role={'navigation'} className={"navbar justify-content-around navbar-light bg-light shadow-sm"}>
                <img className={'col-1'} src={logo} style={{height:75, width:75}} alt={'Logo'}/>
                <h1 className={'col-10 text-center'}>Ask me Anything!</h1>
                <div className={"d-grid gap-1 col-1 me-3"}>
                    <Link hidden={user === ""} className={'btn btn-primary'}>My Profile</Link>
                    <button hidden={user === ""} onClick={logout} className={'btn btn-primary'}>Log Out</button>
                    <Link hidden={user !== ""} to={"/login"} className={'btn btn-primary'}>Log In</Link>
                </div>
            </div>

            <div className={'container-fluid'}>
                <div className="row mb-5">
                    <div className="col">
                        <div className={'mb-3'}>
                            <h3>Questions per keyword</h3>
                        </div>
                        <div className={'mb-3'}>
                            <Bar data={data} options={opts}/>
                        </div>
                    </div>

                    <div className="col">
                        <h3>Questions per day of week</h3>
                    </div>
                    <div className="col">
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
                    <div className="col" >
                        <h3>Answer a Question</h3>
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    )

}

export default Main;