import React, { useEffect, useState } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import { Box, Button, Container, FormControl, Input, Text } from '@chakra-ui/react';
import { AiOutlineSearch, AiOutlinePlus, AiTwotoneDelete, AiFillEdit } from 'react-icons/ai';

const Home = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8081/users')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, [])

    const handlDelete = (id) => {
        if (window.confirm('Vous êtes sûr de supprimer?')) {
            axios.delete('http://localhost:8081/delete/' + id)
                .then(res => {
                    window.location.reload();
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <div className='App'>
            <Container maxW={'full'} p="4" fontSize={'18px'}>
                <Box rounded="lg" boxShadow="base" p="4" maxW={'full'}>
                    <Text fontSize="xl" fontWeight="bold">Gestion d'utilisateur</Text>
                    <Box rounded="lg" boxShadow="base" p="4">
                        <Box mt="2" gap={'2'} mb="4" display={'flex'}>
                            <FormControl>
                                <Input type='text' />
                            </FormControl>
                            <Button leftIcon={<AiOutlineSearch />} colorScheme='teal' variant='outline'
                                maxW="300px" minW="150px">
                                Search
                            </Button>
                        </Box>
                    </Box>
                    <Box mt="5" rounded={'lg'} boxShadow="base">
                        <Box p="4" display={'flex'} justifyContent="space-between">
                            <Text fontSize="xl" fontWeight="bold">
                                Liste des utilisateurs
                            </Text>
                            <Button leftIcon={<AiOutlinePlus fontSize={'20px'} />} colorScheme="teal" variant="outline" maxW="300px"
                                minW="150px">Add User
                            </Button>
                        </Box>

                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Numéro</th>
                                    <th>Nom</th>
                                    <th>Email</th>
                                    <th>Mot de passe</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((users, index) => {
                                        return <tr key={index}>
                                            <td>{users.ID}</td>
                                            <td>{users.Nom}</td>
                                            <td>{users.Email}</td>
                                            <td>{users.Password}</td>
                                            <td>

                                                <Link to={`/edit/${users.ID}`} className='btn btn btn-primary'><AiFillEdit /></Link>
                                                <button onClick={() => handlDelete(users.ID)} className='btn btn btn-danger'><AiTwotoneDelete /></button>
                                            </td>
                                        </tr>
                                    })
                                }
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td>Numéro</td>
                                    <td>Nom</td>
                                    <td>Email</td>
                                    <td>Password</td>
                                    <td>Actions</td>
                                </tr>
                            </tfoot>
                        </table>
                    </Box>
                </Box>
            </Container>
        </div>
    )
}

export default Home