import axios from 'axios';
import React, { useEffect, useState } from 'react'

const EmprunteurAudit = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8081/emprunteur_audit/')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, [])
    return (
        <div className='app'>
            <div className='container'>
                <h2>Liste des emprunts</h2>
                <div className='justify-content-end'>
                    <Link to={"create"} className="btn btn-success">Nouveau(+)</Link>
                </div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Nom de l'emprunteur</th>
                            <th>Ancien andresse</th>
                            <th>Nouvelle adresse</th>
                            <th>Action</th>
                            <th>Date</th>
                            <th>Nom d'utilisateur</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((empunteur_audit, index) => {
                                return <tr key={index}>
                                    <td>{empunteur_audit.nomEmprunteur}</td>
                                    <td>{empunteur_audit.ancienAdresse}</td>
                                    <td>{empunteur_audit.nouvelleAdresse}</td>
                                    <td>{empunteur_audit.action}</td>
                                    <td>{empunteur_audit.Datee}</td>
                                    <td>{empunteur_audit.utilisateur}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default EmprunteurAudit