import React, { useEffect, useState } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'

const Home = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8081/')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, [])

    const handlDelete = (id) => {
        if (window.confirm('Vous êtes sûr de supprimer?')) {
            axios.delete('http://localhost:8081/delete/' + id)
                .then(res => {
                    window.location.reload();
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <div className=''>
            <div className=''>
                <h2>Liste des utilisateurs</h2>
                <div className='justify-content-end'>
                    <Link to={"create"} className="btn btn-success">Nouveau(+)</Link>
                </div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Numéro</th>
                            <th>Nom</th>
                            <th>Email</th>
                            <th>Mot de passe</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((users, index) => {
                                return <tr key={index}>
                                    <td>{users.ID}</td>
                                    <td>{users.Nom}</td>
                                    <td>{users.Email}</td>
                                    <td>{users.Password}</td>
                                    <td>
                                        <Link to={`/detail/${users.ID}`} className="btn text-warning btn-act" data-toggle="modal">Détail</Link>
                                        <Link to={`/edit/${users.ID}`} className='btn btn-sm btn-warning'>Editer</Link>
                                        <button onClick={() => handlDelete(users.ID)} className='btn btn-sm btn-danger'>Suppr</button>
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

export default Home