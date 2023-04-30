import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ExemplaireAidit = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8081/exemplaire_audit/')
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
                            <th>Numéro de l'exemplaire</th>
                            <th>Date du livre</th>
                            <th>Ancien qté</th>
                            <th>Nouvelle qté</th>
                            <th>Action</th>
                            <th>Date</th>
                            <th>Nom d'utilisateur</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((exemplaire_audit, index) => {
                                return <tr key={index}>
                                    <td>{exemplaire_audit.idExemplaire}</td>
                                    <td>{exemplaire_audit.idLivre}</td>
                                    <td>{exemplaire_audit.ancienQte}</td>
                                    <td>{exemplaire_audit.nouvelleQte}</td>
                                    <td>{exemplaire_audit.action}</td>
                                    <td>{exemplaire_audit.Datee}</td>
                                    <td>{exemplaire_audit.utilisateur}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ExemplaireAidit