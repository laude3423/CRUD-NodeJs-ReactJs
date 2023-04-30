import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import {Link} from 'react-router-dom'

const Detail = () => {
    const {id} =useParams()
    const [student, setEtudiant] = useState([])

    useEffect(()=>{
        axios.get('http://localhost:8081/detail/'+id)
        .then(res =>{
            console.log(res.data)
            setEtudiant(res.data[0]);
        })
        .catch(err => console.log(err))
    }, [])

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <h2>Détail d'un étudiant</h2>
            <div className='p-2'>
                <h2>{student.ID}</h2>
                <h2>{student.Nom}</h2>
                <h2>{student.Email}</h2>
                <h2>{student.Contact}</h2>
                <Link to='/' className='btn btn-primary'>Retour</Link>
                <Link to={`/detail/${student.ID}`} className='btn btn-secondary'>Retour</Link>
            </div>
        </div>
    </div>
  )
}

export default Detail