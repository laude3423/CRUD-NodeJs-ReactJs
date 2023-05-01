import { Box, Button, Container, FormControl, Input, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiFillDelete, AiFillEdit, AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Exemplaire = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8081/exemplaire/')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, [])

    const handlDelete = (id) => {
        if (window.confirm('Vous êtes sûr de supprimer?')) {
            axios.delete('http://localhost:8081/exemplaire/delete/' + id)
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
                    <Text fontSize="xl" fontWeight="bold">Gestion d'Exemplaire</Text>
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
                                Liste des exemplaires
                            </Text>
                            <Button leftIcon={<AiOutlinePlus fontSize={'20px'} />} colorScheme="teal" variant="outline" maxW="300px"
                                minW="150px">Add User
                            </Button>
                        </Box>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Numéro du livre</th>
                                    <th>Nombre d'exemplaire</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((exemplaire, index) => {
                                        return <tr key={index}>
                                            <td>{exemplaire.idLivre}</td>
                                            <td>{exemplaire.quantite}</td>
                                            <td>
                                                <Link to={`exemplaire/edit/${exemplaire.idExemplaire}`} className='btn btn btn-primary'><AiFillEdit /></Link>
                                                <button onClick={() => handlDelete(exemplaire.idExemplaire)} className='btn btn btn-danger'><AiFillDelete /></button>
                                            </td>
                                        </tr>
                                    })
                                }
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td>Numéro du livre</td>
                                    <td>Nombre d'exemplaire</td>
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

export default Exemplaire