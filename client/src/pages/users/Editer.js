import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const Editer = () => {

  const { id } = useParams()

  useEffect(() => {
    axios.get('http://localhost:8081/detail/' + id)
      .then(res => {
        console.log(res.data)
        setValues({ ...values, nom: res.data[0].Nom, email: res.data[0].Email, password: res.data[0].Password });
      })
      .catch(err => console.log(err))
  }, [])

  const navigate = useNavigate();
  const [values, setValues] = useState({
    nom: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put('http://localhost:8081/update/' + id, values)
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
          <h2>Modifier un étudiant</h2>
          <div className='mb-2'>
            <label htmlFor='Nom'>Nom</label>
            <input type="text" placeholder='Entrer votre nom ici !' className='form-control'
              onChange={e => setValues({ ...values, nom: e.target.value })} value={values.nom}
            ></input>
          </div>
          <div className='mb-2'>
            <label htmlFor='Email'>Email</label>
            <input type="email" placeholder='Entrer votre email ici !' className='form-control'
              onChange={e => setValues({ ...values, email: e.target.value })} value={values.email}
            ></input>
          </div>
          <div className='mb-2'>
            <label htmlFor='Password'>Mot de passe</label>
            <input type="text" placeholder='Entrer votre contact ici !' className='form-control'
              onChange={e => setValues({ ...values, password: e.target.value })} value={values.password}
            ></input>
          </div>
          <button className='btn btn-success'> Modifier</button>
        </form>
      </div>
    </div>
  )
}

export default Editer