import { Button } from '@chakra-ui/react';
import React from 'react'
import { AiOutlineUser, AiOutlineUsergroupAdd } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom'

const Start = () => {
    const navigate = useNavigate();

    return (
        <div className='appa'>
            <h4 className='titre'>Système de gestion de bibliothèque</h4>

            <div className='containe'>
                <h2>Login</h2>
                <div className='d-flex justify-content-between mt-5'>
                    <Button leftIcon={<AiOutlineUser />} colorScheme='teal' variant='outline' onClick={e => navigate('/adminLogin')} maxW="300px" minW="150px">Admin</Button>
                    <Button leftIcon={<AiOutlineUsergroupAdd />} colorScheme='blue' variant='outline' onClick={e => navigate('/login')} maxW="300px" minW="150px">user</Button>
                </div>
            </div>
        </div>
    )
}

export default Start
