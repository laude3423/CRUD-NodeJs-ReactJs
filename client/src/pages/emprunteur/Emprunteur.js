import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Emprunteur = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8081/emprunteur/')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, [])

    const handlDelete = (id) => {
        if (window.confirm('Vous êtes sûr de supprimer?')) {
            axios.delete('http://localhost:8081/emprunteur/delete/' + id)
                .then(res => {
                    window.location.reload();
                })
                .catch(err => console.log(err))
        }
    }
    return (
        <div className='app'>
            <div className='container'>
                <h2>Liste des emprunteurs</h2>
                <div className='justify-content-end'>
                    <Link to={"emprunteur/create"} className="btn btn-success">Nouveau(+)</Link>
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
                            data.map((emprunteur, index) => {
                                return <tr key={index}>
                                    <td>{emprunteur.nomEprunteur}</td>
                                    <td>{emprunteur.prenomEmprunteur}</td>
                                    <td>{emprunteur.telEmprunteur}</td>
                                    <td>{emprunteur.adresseEmprunteur}</td>
                                    <td>
                                        <Link to={`emprunteur/detail/${emprunteur.idEmprunteur}`} className="btn text-warning btn-act" data-toggle="modal">Détail</Link>
                                        <Link to={`emprunteur/edit/${emprunteur.idEmprunteur}`} className='btn btn-sm btn-warning'>Editer</Link>
                                        <button onClick={() => handlDelete(emprunteur.idEmprunteur)} className='btn btn-sm btn-danger'>Suppr</button>
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

export default Emprunteur