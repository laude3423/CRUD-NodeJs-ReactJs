import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AjoutExemplaire = () => {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        idLivre: '',
        dateAchat: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8081/exemplaire', values)
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
                    <h2>Ajout nouveau exemplaire</h2>
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

export default AjoutExemplaire