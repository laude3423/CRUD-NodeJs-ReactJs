import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditEmprunteur = () => {
    const { id } = useParams()

    useEffect(() => {
        axios.get('http://localhost:8081/emprunteur/detail/' + id)
            .then(res => {
                console.log(res.data)
                setValues({ ...values, nomEmprunteur: res.data[0].nomEmprunteur, prenomEmprunteur: res.data[0].prenomEmprunteur, telEmprunteur: res.data[0].telEmprunteur, adresseEmprunteur: res.data[0].adresseEmprunteur });
            })
            .catch(err => console.log(err))
    }, [])

    const navigate = useNavigate();
    const [values, setValues] = useState({
        nomEmprunteur: '',
        prenomEmprunteur: '',
        telEmprunteur: '',
        adresseEmprunteur: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('http://localhost:8081/emprunteur/update/' + id, values)
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
                    <h2>Modification emprunteur</h2>
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

export default EditEmprunteur