import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const Login = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const [values, setValues] = useState({
        Email: '',
        Password: ''
    })
    const handelSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/login', values)
            .then(res => {
                if (res.data.Status === "Success") {
                    toast({
                        position: "top",
                        title: 'Bienvenue!',
                        status: 'success',
                        duration: 4000,
                        isClosable: true,
                    });
                    navigate('/home');
                } else {
                    toast({
                        position: "top",
                        title: `${res.data.Error}`,
                        status: 'error',
                        duration: 4000,
                        isClosable: true,
                    });
                }
            })
            .catch(err => console.log(err))
    };


    return (
        <div className='appa'>
            <div className="containe">
                <h2>Sign-in</h2>
                <form onSubmit={handelSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='Email'><strong>Email</strong></label>
                        <input type='text' className='form-control' onChange={e => setValues({ ...values, Email: e.target.value })} placeholder='Entrer votre email!' name='Email' required />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='Password'><strong>Password</strong></label>
                        <input type='password' className='form-control' onChange={e => setValues({ ...values, Password: e.target.value })} placeholder='Entrer votre mot de passe!' name='Password' required />
                    </div>
                    <button type='submit' className='btn btn-success w-100'>Sing in</button>
                    <Link to='/register' type='submit' className='btn btn-default w-100 bg-light'>Créer compte</Link>

                </form>
            </div>
        </div>
    )
}

export default Login