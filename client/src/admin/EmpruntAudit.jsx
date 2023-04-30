import axios from 'axios';
import React, { useEffect, useState } from 'react'

const EmpruntAudit = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8081/emprunt_audit/')
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
                            <th>Numéro d'emprunteur</th>
                            <th>Numéro d'exemplaire</th>
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
                                    <td>{emprunt_audit.idExemplaire}</td>
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
    )
}

export default EmpruntAudit