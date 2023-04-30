import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import dateFormat from 'dateformat';

const ModeLivre = () => {
    const { idLivre } = useParams()

    useEffect(() => {
        axios.get('http://localhost:8081/detailLivre/' + idLivre)
            .then(res => {
                console.log(res.data)
                setValues({ ...values, titre: res.data[0].titreLivre, auteur: res.data[0].auteurLivre, editeur: res.data[0].editeurLivre, dateAparution: res.data[0].dateAparution });
            })
            .catch(err => console.log(err))
    }, [])

    const navigate = useNavigate();
    const [values, setValues] = useState({
        titre: '',
        auteur: '',
        editeur: '',
        dateAparution: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('http://localhost:8081/updateLivre/' + idLivre, values)
            .then(res => {
                console.log(res);
                navigate('/livre');
            })
            .catch(err => console.log(err))
    }
    return (
        <div className='appa'>
            <div className='containe'>
                <form onSubmit={handleSubmit}>
                    <h2>Modification d'un livre</h2>
                    <div className='mb-2'>
                        <label htmlFor='titreLivre'>Titre</label>
                        <input type="text" placeholder='Entrer le titre ici !' className='form-control'
                            onChange={e => setValues({ ...values, titre: e.target.value })} value={values.titre}
                        ></input>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='auteurLivre'>Auteur</label>
                        <input type="text" placeholder="Entrer l\'auteur ici !" className='form-control'
                            onChange={e => setValues({ ...values, auteur: e.target.value })} value={values.auteur}
                        ></input>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='editeurLivre'>Editeur</label>
                        <input type="text" placeholder="Entrer l\'editeur ici !" className='form-control'
                            onChange={e => setValues({ ...values, editeur: e.target.value })} value={values.editeur}
                        ></input>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='dateAparution'>Date d'apparution</label>
                        <input type="text" placeholder="Entrer la date d\'apparution ici !" className='form-control'
                            onChange={e => setValues({ ...values, dateAparution: e.target.value })} value={dateFormat(values.dateAparution, 'dd/mm/yyyy')}
                        ></input>
                    </div>
                    <button className='btn btn-success'> Enregistrer</button>
                </form>
            </div>
        </div>
    )
}

export default ModeLivre