import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditEmprunt = () => {
    const { id } = useParams()

    useEffect(() => {
        axios.get('http://localhost:8081/emprunt/detail/' + id)
            .then(res => {
                console.log(res.data)
                setValues({ ...values, idEmprunteur: res.data[0].idEmprunteur, idExemplaire: res.data[0].idExemplaire, dateEmprunt: res.data[0].dateEmprunt, dateRetour: res.data[0].dateRetour });
            })
            .catch(err => console.log(err))
    }, [])

    const navigate = useNavigate();
    const [values, setValues] = useState({
        idEmprunteur: '',
        idExemplaire: '',
        dateEmprunt: '',
        dateRetour: ''
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
                    <h2>Modification emprunt</h2>
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

export default EditEmprunt