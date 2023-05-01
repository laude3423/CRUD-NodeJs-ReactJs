import { Box, Button, Container, FormControl, Input, Text } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AiFillDelete, AiFillEdit, AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const Emprunteur = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8081/emprunteur/')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, [])

    const handlDelete = (id) => {
        if (window.confirm('Vous êtes sûr de supprimer?')) {
            axios.delete('http://localhost:8081/emprunteur/delete/' + id)
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
                    <Text fontSize="xl" fontWeight="bold">Gestion d'emprunteur</Text>
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
                                Liste des emprunteurs
                            </Text>
                            <Button leftIcon={<AiOutlinePlus fontSize={'20px'} />} colorScheme="teal" variant="outline" maxW="300px"
                                minW="150px">Add User
                            </Button>
                        </Box>

                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Nom</th>
                                    <th>Prénom</th>
                                    <th>Téléphone</th>
                                    <th>Adresse</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((emprunteur, index) => {
                                        return <tr key={index}>
                                            <td>{emprunteur.nomEmprunteur}</td>
                                            <td>{emprunteur.prenomEmprunteur}</td>
                                            <td>{emprunteur.telEmprunteur}</td>
                                            <td>{emprunteur.adresseEmprunteur}</td>
                                            <td>
                                                <Link to={`emprunteur/edit/${emprunteur.idEmprunteur}`} className='btn btn btn-primary'><AiFillEdit /></Link>
                                                <button onClick={() => handlDelete(emprunteur.idEmprunteur)} className='btn btn btn-danger'><AiFillDelete /></button>
                                            </td>
                                        </tr>
                                    })
                                }
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td>Nom</td>
                                    <td>Prénom</td>
                                    <td>Téléphone</td>
                                    <td>Adresse</td>
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

export default Emprunteur