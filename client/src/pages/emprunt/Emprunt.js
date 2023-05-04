import { Box, Button, Container, FormControl, Input, Select, Text } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AiFillDelete, AiFillEdit, AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';
import dateFormat from 'dateformat';
import Datepicker from 'react-datepicker';
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
import 'react-datepicker/dist/react-datepicker.css';

const Emprunt = () => {
    const [emprunteurAPI, setEmprunteur] = useState([]);
    const [livreAPI, setLivre] = useState([]);
    const [empruntAPI, setEmprunt] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);

    const [values, setValues] = useState({
        idEmp: '',
        idEmprunteur: '',
        idLivre: '',
        qteEmprunt: '',
        dateEmprunt: '',
        dateRetour: '',
        titreLivre: '',
    });
    const onUpdate = (id) => {
        axios.put('http://localhost:8081/updateEmprunt/' + id, values)
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
        console.log(values);
        axios.post('http://localhost:8081/insertEmprunt', values)
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
        let endpoints = ['http://localhost:8081/emprunt/', 'http://localhost:8081/emprunteur/', 'http://localhost:8081/livre/'];

        axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
            axios.spread(({ data: emprunt }, { data: emprunteur }, { data: livre }) => {

                setEmprunteur(emprunteur);
                setEmprunt(emprunt);
                setLivre(livre);
            })
        );

    }
    const handlEdit = (emprunt) => {
        setValues({ ...values, idEmp: emprunt.idEmprunt, idEmprunteur: emprunt.idEmprunteur, idLivre: emprunt.idLivre, qteEmprunt: emprunt.qteEmprunt, dateEmprunt: emprunt.dateEmprunt, dateRetour: emprunt.dateRetour });
    }
    useEffect(() => {
        getList();
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
                            <Button leftIcon={<AiOutlinePlus fontSize={'20px'} />} onClick={onOpen} colorScheme="teal" variant="outline" maxW="300px"
                                minW="150px">Nouveau(+)
                            </Button>
                        </Box>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Numéro d'emprunteur</th>
                                    <th>Numéro du livre</th>
                                    <th>Nombre</th>
                                    <th>Date d'emprunt</th>
                                    <th>Date de retour</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    empruntAPI.map((emprunt, index) => {
                                        return <tr key={index}>
                                            <td>{emprunt.idEmprunteur}</td>
                                            <td>{emprunt.idLivre}</td>
                                            <td>{emprunt.qteEmprunt}</td>
                                            <td>{dateFormat(emprunt.dateEmprunt, 'dd/mm/yyyy')}</td>
                                            <td>{dateFormat(emprunt.dateRetour, 'dd/mm/yyyy')}</td>
                                            <td>
                                                <button onClick={() => { handlEdit(emprunt); onOpen(); }} className='btn btn btn-primary'><AiFillEdit /></button>
                                                <button onClick={() => handlDelete(emprunt.idEmprunt)} className='btn btn btn-danger'><AiFillDelete /></button>
                                            </td>
                                        </tr>
                                    })
                                }
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td>Numéro d'emprunteur</td>
                                    <td>Numéro du livre</td>
                                    <td>Nombre</td>
                                    <td>Date d'emprunt</td>
                                    <td>Date de retour</td>
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
                                        <Input type='hidden' onChange={e => setValues({ ...values, idEmp: e.target.value })} value={values.idEmp} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Nom d'emprunteur</FormLabel>
                                        <Select placeholder="Choisir nom d'emprunteur" name='idEmprunteur' onChange={e => setValues({ ...values, idEmprunteur: e.target.value })} value={values.idEmprunteur}>
                                            {
                                                emprunteurAPI.map((emprunteur, index) => (
                                                    <option value={emprunteur.idEmprunteur}>{emprunteur.nomEmprunteur}</option>

                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Titre du livre</FormLabel>
                                        <Select placeholder='Choisir titre du livre' name='idLivre' onChange={e => setValues({ ...values, idLivre: e.target.value })} value={values.idLivre}>
                                            {
                                                livreAPI.map((livre, index) => (
                                                    <option value={livre.idLivre}>{livre.titreLivre}</option>

                                                ))
                                            }
                                        </Select>
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel>Nombre emprunté</FormLabel>
                                        <Input type='number' placeholder="Veuillez entrer le nombre emprunté!" name='qteEmprunt' onChange={e => setValues({ ...values, qteEmprunt: e.target.value })} value={values.qteEmprunt} />
                                    </FormControl>
                                    <FormControl>
                                        <label>Date d'emprunt</label>
                                        <div className='form-control'>
                                            <Datepicker selected={selectedDate} onChange={date => setSelectedDate(date)} className='dateEmprunt' name='dateEmprunt' value={dateFormat(values.dateEmprunt, 'dd/mm/yyyy')} placeholder='jj/mm/aaaa'
                                                dateFormat="dd/MM/yyyy"
                                            />
                                        </div>
                                    </FormControl>
                                    <FormControl>
                                        <label>Date de retour</label>
                                        <div className='form-control'>
                                            <Datepicker selected={selectedDate} onChange={date => setSelectedDate(date)} className='dateEmprunt' name='dateRetour' value={dateFormat(values.dateRetour, 'dd/mm/yyyy')} placeholder='jj/mm/aaaa'
                                                dateFormat="dd/MM/yyyy"
                                            />
                                        </div>
                                    </FormControl>
                                </ModalBody>

                                <ModalFooter>
                                    <Button colorScheme='blue' mr={3} onClick={() => (values.idEmp ? onUpdate(values.idEmp) : onAdd())}>
                                        Save
                                    </Button>
                                    <Button onClick={onClose}>Cancel</Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </Box>
                </Box>
            </Container >
        </div >
    )
}

export default Emprunt