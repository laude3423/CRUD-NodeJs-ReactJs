import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AjoutEmprunt = () => {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        idEmprunteur: '',
        idExemplaire: '',
        dateEmprunt: '',
        dateRetour: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8081/livre', values)
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
                    <h2>Ajout un emprunt</h2>
                    <div className='mb-2'>
                        <label htmlFor='idEmprunteur'>Numéro de l'emprunteur</label>
                        <input type="text" placeholder="Entrer le numéro de l'emprunteur ici!" className='form-control'
                            onChange={e => setValues({ ...values, idEmprunteur: e.target.value })}
                        ></input>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='idExemplaire'>Numéro d'exemplaire</label>
                        <input type="text" placeholder="Entrer le numéro de l'exemplaire ici!" className='form-control'
                            onChange={e => setValues({ ...values, idExemplaire: e.target.value })}
                        ></input>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='dateEmprunt'>Date d'amprunt</label>
                        <input type="date" placeholder="Entrer la date d'emprunt ici !" className='form-control'
                            onChange={e => setValues({ ...values, dateEmprunt: e.target.value })}
                        ></input>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='dateRetour'>Date de retour</label>
                        <input type="date" placeholder="Entrer la date de retour ici !" className='form-control'
                            onChange={e => setValues({ ...values, dateRetour: e.target.value })}
                        ></input>
                    </div>
                    <button className='btn btn-success'> Enregistrer</button>
                </form>
            </div>
        </div>
    )
}

export default AjoutEmprunt