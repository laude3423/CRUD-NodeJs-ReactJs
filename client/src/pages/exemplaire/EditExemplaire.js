import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditExemplaire = () => {
    const { id } = useParams()

    useEffect(() => {
        axios.get('http://localhost:8081/exemplaire/detail/' + id)
            .then(res => {
                console.log(res.data)
                setValues({ ...values, idLivre: res.data[0].idLivre, dateAchat: res.data[0].dateAchat });
            })
            .catch(err => console.log(err))
    }, [])

    const navigate = useNavigate();
    const [values, setValues] = useState({
        idLivre: '',
        dateAchat: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('http://localhost:8081/exemplaireupdate/' + id, values)
            .then(res => {
                console.log(res);
                navigate('/');
            })
            .catch(err => console.log(err))
    }
    return (
        <div className='appa'>
            <div className='containe'>
                <form onSubmit={handleSubmit}>
                    <h2>Modification exemplaire</h2>
                    <div className='mb-2'>
                        <label htmlFor='titreLivre'>Numéro du livre</label>
                        <input type="number" placeholder='Choisi un numéro !' className='form-control'
                            onChange={e => setValues({ ...values, titre: e.target.value })}
                        ></input>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='auteurLivre'>Date d'achat</label>
                        <input type="date" placeholder="Entrer la date d'achat ici !" className='form-control'
                            onChange={e => setValues({ ...values, auteur: e.target.value })}
                        ></input>
                    </div>
                    <button className='btn btn-success'> Enregistrer</button>
                </form>
            </div>
        </div>
    )
}

export default EditExemplaire