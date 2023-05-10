import { useToast } from '@chakra-ui/react';
import axios from 'axios'
import React, { useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'


const Register = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const [values, setValues] = useState({
        Nom: '',
        Email: '',
        Password: ''
    })
    const handleLogout = () => {
        if (window.confirm('Souhaitez-vous vraiment vous déconnecter?')) {
            axios.get('http://localhost:8081/logout')
                .then(res => {
                    navigate('/')
                }).catch(err => console.log(err));
        }
    }
    const handelSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/register', values)
            .then(res => {
                toast({
                    position: "top",
                    title: 'Insetion avec succès!',
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                });
                navigate('/');

            })
            .catch(err => console.log(err))
    }

    return (
        <div className='appa'>
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                            <a href="/" className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">
                                <span className="fs-5 fw-bolder d-none d-sm-inline">User Acceuil</span>
                            </a>
                            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                                <li>
                                    <Link to="/adminHome" className="link text-white">
                                        <i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline">Acceuil</span> </Link>
                                </li>
                                <li>
                                    <Link to="/emprunt" className="link text-white">
                                        <i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Emprunt</span> </Link>
                                </li>
                                <li>
                                    <Link to="/emprunteur" className="link text-white">
                                        <i className="fs-4 bi-person"></i> <span className="ms-1 d-none d-sm-inline">Emprunteur</span></Link>
                                </li>
                                <li>
                                    <Link to="/livre" className="link text-white">
                                        <i className="fs-4 bi-person"></i> <span className="ms-1 d-none d-sm-inline">Livre</span></Link>
                                </li>
                                <li>
                                    <Link to="/register" className="link active">
                                        <i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Gérer user</span></Link>
                                </li>
                                <li onClick={handleLogout}>
                                    <a href="#" className="link text-white">
                                        <i className="fs-4 bi-power"></i> <span className="ms-1 d-none d-sm-inline">Logout</span></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col p-0 m-0">
                        <div className='p-2 d-flex justify-content-center shadow'>
                            <h4 style={{ fontWeight: "bold" }}>Système de gestion de bibliothèque</h4>
                        </div>
                        <Outlet />
                        <div className="containe">
                            <h2>Singup</h2>
                            <form onSubmit={handelSubmit}>
                                <div className='mb-3'>
                                    <label htmlFor='Nom'><strong>Nom</strong></label>
                                    <input type='text' className='form-control' onChange={e => setValues({ ...values, Nom: e.target.value })} placeholder='Entrer votre nom!' name='Nom' required />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='Email'><strong>Email</strong></label>
                                    <input type='text' className='form-control' onChange={e => setValues({ ...values, Email: e.target.value })} placeholder='Entrer votre nom!' name='Email' required />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='Password'><strong>Password</strong></label>
                                    <input type='password' className='form-control' onChange={e => setValues({ ...values, Password: e.target.value })} placeholder='Entrer votre nom!' name='Password' required />
                                </div>
                                <button type='submit' className='btn btn-success w-100'>Sing up</button>
                                <Link to='/' type='submit' className='btn btn-default w-100 bg-light rounded-0'>Sing up</Link>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
