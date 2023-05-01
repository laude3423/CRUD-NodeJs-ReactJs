import { Box, Button, Container, FormControl, Input, Text } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AiFillDelete, AiFillEdit, AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai'
import { Link } from 'react-router-dom';
import dateFormat from 'dateformat'

const Emprunt = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8081/emprunt/')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, [])

    const handlDelete = (id) => {
        if (window.confirm('Vous êtes sûr de supprimer?')) {
            axios.delete('http://localhost:8081/emprunt/delete/' + id)
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
                    <Text fontSize="xl" fontWeight="bold">Gestion d'emprunt</Text>
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
                                Liste des emprunts
                            </Text>
                            <Button leftIcon={<AiOutlinePlus fontSize={'20px'} />} colorScheme="teal" variant="outline" maxW="300px"
                                minW="150px">Add User
                            </Button>
                        </Box>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Numéro d'emprunteur</th>
                                    <th>Numéro d'exemplaire</th>
                                    <th>Nombre</th>
                                    <th>Date d'emprunt</th>
                                    <th>Date de retour</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((emprunt, index) => {
                                        return <tr key={index}>
                                            <td>{emprunt.idEmprunteur}</td>
                                            <td>{emprunt.idExemplaire}</td>
                                            <td>{emprunt.qteEmprunt}</td>
                                            <td>{dateFormat(emprunt.dateEmprunt, 'dd/mm/yyyy')}</td>
                                            <td>{dateFormat(emprunt.dateRetour, 'dd/mm/yyyy')}</td>
                                            <td>
                                                <Link to={`emprunt/edit/${emprunt.idEmprunt}`} className='btn btn btn-primary'><AiFillEdit /></Link>
                                                <button onClick={() => handlDelete(emprunt.idEmprunt)} className='btn btn btn-danger'><AiFillDelete /></button>
                                            </td>
                                        </tr>
                                    })
                                }
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td>Numéro d'emprunteur</td>
                                    <td>Numéro d'exemplaire</td>
                                    <td>Nombre</td>
                                    <td>Date d'emprunt</td>
                                    <td>Date de retour</td>
                                    <td>Actions</td>
                                </tr>
                            </tfoot>
                        </table>
                    </Box>
                </Box>
            </Container >
        </div >
    )
}

export default Emprunt