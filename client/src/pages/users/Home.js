import React, { useEffect, useState } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Box, Button, Container, FormControl, Input, Text, useDisclosure } from '@chakra-ui/react';
import { AiOutlineSearch, AiOutlinePlus, AiTwotoneDelete, AiFillEdit } from 'react-icons/ai';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormLabel,
    useToast
} from '@chakra-ui/react'

const Home = () => {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
    const [data, setData] = useState([]);
    const [input, setInput] = useState('')
    const isError = input === ''

    const [values, setValues] = useState({
        iduser: '',
        nom: '',
        email: '',
        contact: ''
    });
    const onUpdate = (id) => {
        axios.put('http://localhost:8081/updateUser/' + id, values)
            .then(res => {
                toast({
                    position: "top",
                    title: 'Modification avec succès!',
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                });
                onClose();
                getList();
            })
            .catch(err => console.log(err))
    }
    const onAdd = () => {
        axios.post('http://localhost:8081/users', values)
            .then(res => {
                console.log(res);
                onClose();
                getList();
            })
            .catch(err => console.log(err))
    }
    const getList = () => {
        axios.get('http://localhost:8081/users')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }
    const handlEdit = (users) => {
        setValues({ ...values, iduser: users.ID, nom: users.Nom, email: users.Email, password: users.Password });
    }

    useEffect(() => {
        getList();
    }, [])

    const handlDelete = (id) => {
        if (window.confirm('Vous êtes sûr de supprimer?')) {
            axios.delete('http://localhost:8081/delete/' + id)
                .then(res => {
                    getList();
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
                            <Button leftIcon={<AiOutlineSearch />} onClick={onOpen} colorScheme='teal' variant='outline'
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
                            <Button leftIcon={<AiOutlinePlus fontSize={'20px'} />} onClick={onOpen} colorScheme="teal" variant="outline" maxW="300px"
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

                                                <button onClick={() => { handlEdit(users); onOpen(); }} className='btn btn btn-primary'><AiFillEdit /></button>
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
                        <Modal
                            initialFocusRef={initialRef}
                            finalFocusRef={finalRef}
                            isOpen={isOpen}
                            onClose={onClose}
                        >
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Ajouter nouveau</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody pb={6}>
                                    <FormControl isInvalid={isError}>
                                        <FormLabel>ID</FormLabel>
                                        <Input ref={initialRef} type='number' placeholder='ID' name='ID' onChange={e => setValues({ ...values, iduser: e.target.value })} value={values.iduser} />
                                    </FormControl>
                                    <FormControl isInvalid={isError}>
                                        <FormLabel>Nom</FormLabel>
                                        <Input ref={initialRef} type='text' placeholder='Nom' name='Nom' onChange={e => setValues({ ...values, nom: e.target.value })} value={values.nom} />
                                    </FormControl>
                                    <FormControl isInvalid={isError}>
                                        <FormLabel>Email</FormLabel>
                                        <Input type={'email'} placeholder='Email' name='Email' onChange={e => setValues({ ...values, email: e.target.value })} value={values.email} />
                                    </FormControl>

                                    <FormControl isInvalid={isError}>
                                        <FormLabel>Mot de passe</FormLabel>
                                        <Input type='password' placeholder='Votre mot de passe' name='Password' onChange={e => setValues({ ...values, password: e.target.value })} value={values.password} />
                                    </FormControl>
                                </ModalBody>

                                <ModalFooter>
                                    <Button colorScheme='blue' mr={3} onClick={() => (values.iduser ? onUpdate(values.iduser) : onAdd())}>
                                        Save
                                    </Button>
                                    <Button onClick={onClose}>Cancel</Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </Box>
                </Box>
            </Container>
        </div>
    )
}

export default Home