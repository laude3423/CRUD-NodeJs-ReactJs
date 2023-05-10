import { Button, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const [values, setValues] = useState({
        Email: '',
        Password: ''
    })
    const handelSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/adminLogin', values)
            .then(res => {
                if (res.data.Status === "Success") {
                    toast({
                        position: "top",
                        title: 'Bienvenue!',
                        status: 'success',
                        duration: 4000,
                        isClosable: true,
                    });
                    navigate('/adminHome');
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
                <h2>Sing-in</h2>
                <form onSubmit={handelSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='Email'><strong>Email</strong></label>
                        <input type='text' className='form-control' onChange={e => setValues({ ...values, Email: e.target.value })} placeholder='Entrer votre email!' name='Email' required />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='Password'><strong>Password</strong></label>
                        <input type='password' className='form-control' onChange={e => setValues({ ...values, Password: e.target.value })} placeholder='Entrer votre mot de passe!' name='Password' required />
                    </div>
                    <Button type='submit' colorScheme='teal' variant='outline' maxW="600px" minW="300px" >Sing in</Button>

                </form>
            </div>
        </div>
    )
}

export default Login