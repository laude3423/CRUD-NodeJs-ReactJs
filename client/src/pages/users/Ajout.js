import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Ajout = () => {

  const navigate = useNavigate();

  const [values, setValues] = useState({
    nom: '',
    email: '',
    contact: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8081/student', values)
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
          <h2>Ajout nouveau étudiant</h2>
          <div className='mb-2'>
            <label htmlFor='Nom'>Nom</label>
            <input type="text" placeholder='Entrer votre nom ici !' className='form-control'
              onChange={e => setValues({ ...values, nom: e.target.value })}
            ></input>
          </div>
          <div className='mb-2'>
            <label htmlFor='Email'>Email</label>
            <input type="email" placeholder='Entrer votre email ici !' className='form-control'
              onChange={e => setValues({ ...values, email: e.target.value })}
            ></input>
          </div>
          <div className='mb-2'>
            <label htmlFor='Contact'>Contact</label>
            <input type="text" placeholder='Entrer votre contact ici !' className='form-control'
              onChange={e => setValues({ ...values, contact: e.target.value })}
            ></input>
          </div>
          <button className='btn btn-success'> Enregistrer</button>
        </form>
      </div>
    </div>
  )
}

export default Ajout