import { useToast } from '@chakra-ui/react';
import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const Register = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const [values, setValues] = useState({
        Nom: '',
        Email: '',
        Password: ''
    })

    const handelSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/register', values)
            .then(res => {
                toast({
                    position: "top",
                    title: 'Insetion avec succès!',
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                });
                navigate('/');

            })
            .catch(err => console.log(err))
    }

    return (
        <div className='appa'>
            <div className="containe">
                <h2>Singup</h2>
                <form onSubmit={handelSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='Nom'><strong>Nom</strong></label>
                        <input type='text' className='form-control' onChange={e => setValues({ ...values, Nom: e.target.value })} placeholder='Entrer votre nom!' name='Nom' required />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='Email'><strong>Email</strong></label>
                        <input type='text' className='form-control' onChange={e => setValues({ ...values, Email: e.target.value })} placeholder='Entrer votre nom!' name='Email' required />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='Password'><strong>Password</strong></label>
                        <input type='password' className='form-control' onChange={e => setValues({ ...values, Password: e.target.value })} placeholder='Entrer votre nom!' name='Password' required />
                    </div>
                    <button type='submit' className='btn btn-success w-100'>Sing up</button>
                    <Link to='/' type='submit' className='btn btn-default w-100 bg-light rounded-0'>Sing up</Link>

                </form>
            </div>
        </div>
    )
}

export default Register
