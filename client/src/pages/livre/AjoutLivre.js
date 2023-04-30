import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AjoutLivre = () => {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        titre: '',
        auteur: '',
        editeur: '',
        dateAparution: ''
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
            <div className='container'>
                <form onSubmit={handleSubmit}>
                    <h2>Ajout nouveau livres</h2>
                    <div className='mb-2'>
                        <label htmlFor='titreLivre'>Titre</label>
                        <input type="text" placeholder='Entrer le titre ici !' className='form-control'
                            onChange={e => setValues({ ...values, titre: e.target.value })}
                        ></input>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='auteurLivre'>Auteur</label>
                        <input type="text" placeholder="Entrer l\'auteur ici !" className='form-control'
                            onChange={e => setValues({ ...values, auteur: e.target.value })}
                        ></input>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='editeurLivre'>Editeur</label>
                        <input type="text" placeholder="Entrer l\'editeur ici !" className='form-control'
                            onChange={e => setValues({ ...values, editeur: e.target.value })}
                        ></input>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='dateAparution'>Date d'apparution</label>
                        <input type="date" placeholder="Entrer la date d\'apparution ici !" className='form-control'
                            onChange={e => setValues({ ...values, dateAparution: e.target.value })}
                        ></input>
                    </div>
                    <button className='btn btn-success'> Enregistrer</button>
                </form>
            </div>
        </div>
    )
}

export default AjoutLivre