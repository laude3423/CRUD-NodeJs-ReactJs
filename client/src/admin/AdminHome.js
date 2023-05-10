import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'

function AdminHome() {
    const [adminCount, setAdminCount] = useState([])
    const [employeeCount, setEmployeeCount] = useState([])
    const [livreCount, setLivreCount] = useState([])
    const [empruntCount, setEmpruntCount] = useState([])
    const [emprunteurCount, setEmprunteurCount] = useState([])
    const navigate = useNavigate();

    const handleLogout = () => {
        if (window.confirm('Souhaitez-vous vraiment vous déconnecter?')) {
            axios.get('http://localhost:8081/logout')
                .then(res => {
                    navigate('/')
                }).catch(err => console.log(err));
        }
    }
    useEffect(() => {
        axios.get('http://localhost:8081/admin')
            .then(res => {
                setAdminCount(res.data)
            }).catch(err => console.log(err));

        axios.get('http://localhost:8081/users')
            .then(res => {
                setEmployeeCount(res.data)
            }).catch(err => console.log(err));

        axios.get('http://localhost:8081/livre')
            .then(res => {
                setLivreCount(res.data)
            }).catch(err => console.log(err));
        axios.get('http://localhost:8081/emprunt')
            .then(res => {
                setEmpruntCount(res.data)
            }).catch(err => console.log(err));
        axios.get('http://localhost:8081/emprunteur')
            .then(res => {
                setEmprunteurCount(res.data)
            }).catch(err => console.log(err));

    }, [])
    return (
        <div className='appa'>
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                            <a href="/" className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">
                                <span className="fs-5 fw-bolder d-none d-sm-inline">Admin Acceuil</span>
                            </a>
                            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                                <li>
                                    <Link to="/adminHome" className="link active">
                                        <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">Acceuil</span> </Link>
                                </li>
                                <li>
                                    <Link to="/empruntAudit" className="link text-white">
                                        <i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Emprunt</span> </Link>
                                </li>
                                <li>
                                    <Link to="/emprunteurAudit" className="link text-white">
                                        <i className="fs-4 bi-person"></i> <span className="ms-1 d-none d-sm-inline">Emprunteur</span></Link>
                                </li>
                                <li>
                                    <Link to="/livreAudit" className="link text-white">
                                        <i className="fs-4 bi-book"></i> <span className="ms-1 d-none d-sm-inline">Livre</span></Link>
                                </li>
                                <li>
                                    <Link to="/register" className="link text-white">
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
                        <div className='p-3 d-flex justify-content-around mt-3 text-color'>
                            <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
                                <div className='text-center pb-1'>
                                    <h4>Admin</h4>
                                </div>
                                <hr />
                                <div className=''>
                                    <h5>Total: {adminCount.length}</h5>
                                </div>
                            </div>
                            <div className='px-3 pt-2 pb-3 border shadow-sm w-25 '>
                                <div className='text-center pb-1'>
                                    <h4>Utilisateurs</h4>
                                </div>
                                <hr />
                                <div className=''>
                                    <h5>Total: {employeeCount.length}</h5>
                                </div>
                            </div>
                            <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
                                <div className='text-center pb-1'>
                                    <h4>Livre Initiale</h4>
                                </div>
                                <hr />
                                <div className=''>
                                    <h5>Total: {livreCount.length}</h5>
                                </div>
                            </div>
                            <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
                                <div className='text-center pb-1'>
                                    <h4>Livre Finale</h4>
                                </div>
                                <hr />
                                <div className=''>
                                    <h5>Total: {livreCount.length}</h5>
                                </div>
                            </div>

                        </div>
                        <div className='p-3 d-flex justify-content-around mt-3 text-color'>
                            <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
                                <div className='text-center pb-1'>
                                    <h4>Emprunteurs</h4>
                                </div>
                                <hr />
                                <div className=''>
                                    <h5>Total: {emprunteurCount.length}</h5>
                                </div>
                            </div>
                            <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
                                <div className='text-center pb-1'>
                                    <h4>Emprunts</h4>
                                </div>
                                <hr />
                                <div className=''>
                                    <h5>Total: {empruntCount.length}</h5>
                                </div>
                            </div>
                            <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
                                <div className='text-center pb-1'>
                                    <h4>Remise</h4>
                                </div>
                                <hr />
                                <div className=''>
                                    <h5>Total: {livreCount.length}</h5>
                                </div>
                            </div>
                            <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
                                <div className='text-center pb-1'>
                                    <h4>Perdus</h4>
                                </div>
                                <hr />
                                <div className=''>
                                    <h5>Total: {livreCount.length}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminHome