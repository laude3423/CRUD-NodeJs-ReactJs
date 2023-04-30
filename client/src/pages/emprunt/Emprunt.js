import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Emprunt = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8081/emprunt/')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, [])

    const handlDelete = (id) => {
        if (window.confirm('Vous êtes sûr de supprimer?')) {
            axios.delete('http://localhost:8081/emprunt/delete/' + id)
                .then(res => {
                    window.location.reload();
                })
                .catch(err => console.log(err))
        }
    }
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
                            <th>Titre</th>
                            <th>Auteur</th>
                            <th>Editeur</th>
                            <th>Date d'apparution</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((emprunt, index) => {
                                return <tr key={index}>
                                    <td>{emprunt.idEmprunteur}</td>
                                    <td>{emprunt.idExemplaire}</td>
                                    <td>{emprunt.dateEmprunt}</td>
                                    <td>{emprunt.dateRetour}</td>
                                    <td>
                                        <Link to={`emprunt/detail/${emprunt.idEmprunt}`} className="btn text-warning btn-act" data-toggle="modal">Détail</Link>
                                        <Link to={`emprunt/edit/${emprunt.idEmprunt}`} className='btn btn-sm btn-warning'>Editer</Link>
                                        <button onClick={() => handlDelete(emprunt.idEmprunt)} className='btn btn-sm btn-danger'>Suppr</button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Emprunt