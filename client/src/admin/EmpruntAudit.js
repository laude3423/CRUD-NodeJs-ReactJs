import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'

const EmpruntAudit = () => {
    const [data, setData] = useState([])
    const navigate = useNavigate();

    const handleLogout = () => {
        if (window.confirm("Souhaitez-vous vraiment vous déconnecter?")) {
            axios.get('http://localhost:8081/logout')
                .then(res => {
                    navigate('/');
                })
                .catch(err => console.log(err));
        }
    }
    useEffect(() => {
        axios.get('http://localhost:8081/emprunt_audit/')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, [])

    return (
        <div className='app'>
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                            <a href="/" className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">
                                <span className="fs-5 fw-bolder d-none d-sm-inline">Admin Acceuil</span>
                            </a>
                            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                                <li>
                                    <Link to="/adminHome" className="link text-white">
                                        <i className="fs-4 bi-house"></i><span className="ms-1 d-none d-sm-inline">Acceuil</span> </Link>
                                </li>
                                <li>
                                    <Link to="/empruntAudit" className="link active">
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
                            <h4>Liste des audits en emprunt</h4>
                        </div>
                        <div className='justify-content-end'>
                        </div>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Numéro d'emprunteur</th>
                                    <th>Ancien numéro du livre</th>
                                    <th>Nouvel numéro du livre</th>
                                    <th>Date d'emprunt</th>
                                    <th>Date de retour</th>
                                    <th>Ancien qté</th>
                                    <th>Nouvelle qté</th>
                                    <th>Action</th>
                                    <th>Date</th>
                                    <th>Nom d'utilisateur</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((emprunt_audit, index) => {
                                        return <tr key={index}>
                                            <td>{emprunt_audit.idEmprunteur}</td>
                                            <td>{emprunt_audit.ancienidLivre}</td>
                                            <td>{emprunt_audit.nouvelleidLivre}</td>
                                            <td>{emprunt_audit.dateEmprunt}</td>
                                            <td>{emprunt_audit.dateRetour}</td>
                                            <td>{emprunt_audit.ancienQte}</td>
                                            <td>{emprunt_audit.nouvelleQte}</td>
                                            <td>{emprunt_audit.action}</td>
                                            <td>{emprunt_audit.Datee}</td>
                                            <td>{emprunt_audit.utilisateur}</td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmpruntAudit