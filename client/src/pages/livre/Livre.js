import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import dateFormat from 'dateformat';
import { Box, Button, Container, FormControl, Input, Text } from '@chakra-ui/react';
import { AiFillDelete, AiOutlinePlus, AiOutlineSearch, AiFillEdit } from 'react-icons/ai';

const Livre = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8081/livre/')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, [])

    const handlDelete = (id) => {
        if (window.confirm('Vous êtes sûr de supprimer?')) {
            axios.delete('http://localhost:8081/livre/delete/' + id)
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
                    <Text fontSize="xl" fontWeight="bold">Gestion de Livre</Text>
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
                                Liste des livres
                            </Text>
                            <Button leftIcon={<AiOutlinePlus fontSize={'20px'} />} colorScheme="teal" variant="outline" maxW="300px"
                                minW="150px">Add User
                            </Button>
                        </Box>

                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Titre</th>
                                    <th>Auteur</th>
                                    <th>Editeur</th>
                                    <th>Date Parution</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((livre, index) => {
                                        return <tr key={index}>
                                            <td>{livre.titreLivre}</td>
                                            <td>{livre.auteurLivre}</td>
                                            <td>{livre.editeurLivre}</td>
                                            <td>{dateFormat(livre.dateAparution, 'dd/mm/yyyy')}</td>
                                            <td>
                                                <Link to={`/editLivre/${livre.idLivre}`} className='btn btn btn-primary'><AiFillEdit /></Link>
                                                <button onClick={() => handlDelete(livre.idLivre)} className='btn btn btn-danger'><AiFillDelete /></button>
                                            </td>
                                        </tr>
                                    })
                                }
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td>Titre</td>
                                    <td>Auteur</td>
                                    <td>Editeur</td>
                                    <td>Date parution</td>
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

export default Livre