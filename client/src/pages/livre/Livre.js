import axios from 'axios';
import React, { useEffect, useState } from 'react'
import dateFormat from 'dateformat';
import { Box, Button, Container, FormControl, Input, Text } from '@chakra-ui/react';
import { AiFillDelete, AiOutlinePlus, AiOutlineSearch, AiFillEdit } from 'react-icons/ai';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormLabel,
    useToast,
    useDisclosure
} from '@chakra-ui/react';
const Livre = () => {
    const [data, setData] = useState([]);
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
    const [values, setValues] = useState({
        idLivre: '',
        titreLivre: '',
        auteurLivre: '',
        editeurLivre: '',
        nombre: '',
        dateParution: ''
    });
    const onUpdate = (id) => {
        console.log(id);
        axios.put('http://localhost:8081/updateLivre/' + id, values)
            .then(res => {
                console.log(res);
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
        axios.post('http://localhost:8081/insertLivre', values)
            .then(res => {
                console.log(res);
                toast({
                    position: "top",
                    title: 'Insetion avec succès!',
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                });
                onClose();
                getList();
            })
            .catch(err => console.log(err))
    }
    const getList = () => {
        axios.get('http://localhost:8081/livre')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }
    const handlEdit = (livre1) => {
        setValues({ ...values, idLivre: livre1.idLivre, titreLivre: livre1.titreLivre, auteurLivre: livre1.auteurLivre, editeurLivre: livre1.editeurLivre, nombre: livre1.nombre, dateParution: livre1.dateParution });
    }

    useEffect(() => {
        getList();
    }, [])

    const handlDelete = (id) => {
        if (window.confirm('Vous êtes sûr de supprimer?')) {
            axios.delete('http://localhost:8081/livre/delete/' + id)
                .then(res => {
                    toast({
                        position: "top",
                        title: 'Modification avec succès!',
                        status: 'success',
                        duration: 4000,
                        isClosable: true,
                    });
                    getList();
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
                            <Button leftIcon={<AiOutlinePlus fontSize={'20px'} />} onClick={onOpen} colorScheme="teal" variant="outline" maxW="300px"
                                minW="150px">Add User
                            </Button>
                        </Box>

                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Titre</th>
                                    <th>Auteur</th>
                                    <th>Editeur</th>
                                    <th>Nombre d'exemplaire</th>
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
                                            <td>{livre.nombre}</td>
                                            <td>{dateFormat(livre.dateParution, 'dd/mm/yyyy')}</td>
                                            <td>
                                                <button onClick={() => { handlEdit(livre); onOpen(); }} className='btn btn btn-primary'><AiFillEdit /></button>
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
                                    <td>Nombre d'exemplaire</td>
                                    <td>Date parution</td>
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
                                <ModalHeader>Ajout/Modification</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody pb={6}>
                                    <FormControl>
                                        <Input type='hidden' onChange={e => setValues({ ...values, idLivre: e.target.value })} value={values.idLivre} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Titre</FormLabel>
                                        <Input ref={initialRef} type='text' placeholder="Veuillez entrer ici le titre!" name='titreLivre' onChange={e => setValues({ ...values, titreLivre: e.target.value })} value={values.titreLivre} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Auteur</FormLabel>
                                        <Input type={'text'} placeholder="Veuillez entrer ici l'auteur!" name='auteurLivre' onChange={e => setValues({ ...values, auteurLivre: e.target.value })} value={values.auteurLivre} />
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel>Editeur</FormLabel>
                                        <Input type='text' placeholder="Veuillez entrer ici l'éditeur!" name='editeurLivre' onChange={e => setValues({ ...values, editeurLivre: e.target.value })} value={values.editeurLivre} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Nombre d'exemplaire</FormLabel>
                                        <Input type='number' placeholder="Veuillez entrer ici le nombre d'exemplaire!" name='nombre' onChange={e => setValues({ ...values, nombre: e.target.value })} value={values.nombre} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Date de parution</FormLabel>
                                        <Input type='date' placeholder="Veuillez entrer ici le date de parution!" name='dateParution' onChange={e => setValues({ ...values, dateParution: e.target.value })} value={values.dateParution} />
                                    </FormControl>
                                </ModalBody>

                                <ModalFooter>
                                    <Button colorScheme='blue' mr={3} onClick={() => (values.idLivre ? onUpdate(values.idLivre) : onAdd())}>
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

export default Livre