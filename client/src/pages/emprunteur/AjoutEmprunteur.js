import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AjoutEmprunteur = () => {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        nomEmprunteur: '',
        prenomEmprunteur: '',
        telEmprunteur: '',
        adresseEmprunteur: ''
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
                    <h2>Ajout nouveau emprunteur</h2>
                    <div className='mb-2'>
                        <label htmlFor='nomEmprunteur'>Nom</label>
                        <input type="text" placeholder="Entrer le nom de l'emprunteur ici!" className='form-control'
                            onChange={e => setValues({ ...values, nomEprunteur: e.target.value })}
                        ></input>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='prenomEmprunteur'>Prénom</label>
                        <input type="text" placeholder="Entrer le prénom de l'emprunteur ici!" className='form-control'
                            onChange={e => setValues({ ...values, prenomEmprunteur: e.target.value })}
                        ></input>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='telEmprunteur'>Numéro téléphone</label>
                        <input type="text" placeholder="Entrer le numéro téléphone ici !" className='form-control'
                            onChange={e => setValues({ ...values, telEmprunteur: e.target.value })}
                        ></input>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='adresseEmprunteur'>Adresse</label>
                        <input type="date" placeholder="Entrer l'adresse ici !" className='form-control'
                            onChange={e => setValues({ ...values, adresseEmprunteur: e.target.value })}
                        ></input>
                    </div>
                    <button className='btn btn-success'> Enregistrer</button>
                </form>
            </div>
        </div>
    )
}

export default AjoutEmprunteur