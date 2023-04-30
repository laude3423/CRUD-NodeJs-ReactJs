import axios from 'axios';
import React, { useEffect, useState } from 'react'

const LivreAudit = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8081/livre_audit/')
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
                            <th>Auteur</th>
                            <th>Editeur</th>
                            <th>Ancien itre</th>
                            <th>Nouveau titre</th>
                            <th>Action</th>
                            <th>Date</th>
                            <th>Nom d'utilisateur</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((livre_audit, index) => {
                                return <tr key={index}>
                                    <td>{livre_audit.auteurLivre}</td>
                                    <td>{livre_audit.editeurLivre}</td>
                                    <td>{livre_audit.ancienTitre}</td>
                                    <td>{livre_audit.nouvelleTitre}</td>
                                    <td>{livre_audit.action}</td>
                                    <td>{livre_audit.Datee}</td>
                                    <td>{livre_audit.utilisateur}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default LivreAudit