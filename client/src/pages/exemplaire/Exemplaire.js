import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Exemplaire = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8081/exemplaire/')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, [])

    const handlDelete = (id) => {
        if (window.confirm('Vous êtes sûr de supprimer?')) {
            axios.delete('http://localhost:8081/exemplaire/delete/' + id)
                .then(res => {
                    window.location.reload();
                })
                .catch(err => console.log(err))
        }
    }
    return (
        <div className='app'>
            <div className='container'>
                <h2>Liste des exemplaires</h2>
                <div className=' justify-content-end'>
                    <Link to={"create"} className="btn btn-success">Nouveau(+)</Link>
                </div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Numéro du livre</th>
                            <th>Date d'achat</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((exemplaire, index) => {
                                return <tr key={index}>
                                    <td>{exemplaire.idLivre}</td>
                                    <td>{exemplaire.dateAchat}</td>
                                    <td>
                                        <Link to={`exemplaire/detail/${exemplaire.idExemplaire}`} className="btn text-warning btn-act" data-toggle="modal">Détail</Link>
                                        <Link to={`exemplaire/edit/${exemplaire.idExemplaire}`} className='btn btn-sm btn-warning'>Editer</Link>
                                        <button onClick={() => handlDelete(exemplaire.idExemplaire)} className='btn btn-sm btn-danger'>Suppr</button>
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

export default Exemplaire