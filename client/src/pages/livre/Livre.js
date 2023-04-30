import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import dateFormat from 'dateformat';

const Livre = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8081/livre/')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, [])

    const handlDelete = (id) => {
        if (window.confirm('Vous êtes sûr de supprimer?')) {
            axios.delete('http://localhost:8081/livre/delete/' + id)
                .then(res => {
                    window.location.reload();
                })
                .catch(err => console.log(err))
        }
    }
    return (
        <div className='app'>
            <div className='container'>
                <h2>Liste des Livres</h2>
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
                            data.map((livre, index) => {
                                return <tr key={index}>
                                    <td>{livre.titreLivre}</td>
                                    <td>{livre.auteurLivre}</td>
                                    <td>{livre.editeurLivre}</td>
                                    <td>{dateFormat(livre.dateAparution, 'dd/mm/yyyy')}</td>
                                    <td>
                                        <Link to={`/detailLivre/${livre.idLivre}`} className="btn text-warning btn-act" data-toggle="modal">Détail</Link>
                                        <Link to={`/editLivre/${livre.idLivre}`} className='btn btn-sm btn-warning'>Editer</Link>
                                        <button onClick={() => handlDelete(livre.idLivre)} className='btn btn-sm btn-danger'>Suppr</button>
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

export default Livre