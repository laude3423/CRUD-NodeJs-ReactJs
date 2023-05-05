import { Box, Button, Container, FormControl, Input, Text } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AiFillDelete, AiFillEdit, AiOutlinePlus, AiOutlineReload, AiOutlineSearch } from 'react-icons/ai';
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

const Emprunteur = () => {
    const [data, setData] = useState([])
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
    const [search, setSearch] = useState("")

    const [values, setValues] = useState({
        idEmp: '',
        nomEmprunteur: '',
        prenomEmprunteur: '',
        telEmprunteur: '',
        adresseEmprunteur: ''
    });
    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 4;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = data.slice(firstIndex, lastIndex);
    const npage = Math.ceil(data.length / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);

    const changePage = (id) => {
        setCurrentPage(id)
    }
    const prevPage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1)
        }
    }
    const nextPage = () => {
        if (currentPage !== npage) {
            setCurrentPage(currentPage + 1)
        }
    }
    //pagination
    const recherche = () => {
        axios.get('http://localhost:8081/searchEmprunteur/' + search)
            .then(res => {
                setData(res.data)
                setSearch("");
            })
            .catch(err => console.log(err));
    }
    const onUpdate = (id) => {
        axios.put('http://localhost:8081/updateEmprunteur/' + id, values)
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
                vider();
            })
            .catch(err => console.log(err))
    }
    const onAdd = () => {
        axios.post('http://localhost:8081/insertEmprunteur', values)
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
                vider();
            })
            .catch(err => console.log(err))
    }
    const getList = () => {
        axios.get('http://localhost:8081/emprunteur/')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }
    const handlEdit = (emprunteur) => {
        setValues({ ...values, idEmp: emprunteur.idEmprunteur, nomEmprunteur: emprunteur.nomEmprunteur, prenomEmprunteur: emprunteur.prenomEmprunteur, telEmprunteur: emprunteur.telEmprunteur, adresseEmprunteur: emprunteur.adresseEmprunteur });
    }
    const vider = () => {
        setValues("");
    }
    useEffect(() => {
        getList();
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
                                <input type={'text'} name='src' onChange={(e) => setSearch(e.target.value)} className='form-control' placeholder="Tapez ici le titre du livre à chercher ...." value={search} />
                            </FormControl>
                            <Button leftIcon={<AiOutlineSearch />} colorScheme='teal' variant='outline' onClick={recherche}
                                maxW="300px" minW="150px">
                                Search
                            </Button>
                            <Button leftIcon={<AiOutlineReload />} colorScheme='teal' variant='outline' onClick={getList}
                                maxW="300px" minW="150px">
                                Actualiser
                            </Button>
                        </Box>
                    </Box>
                    <Box mt="5" rounded={'lg'} boxShadow="base">
                        <Box p="4" display={'flex'} justifyContent="space-between">
                            <Text fontSize="xl" fontWeight="bold">
                                Liste des emprunteurs
                            </Text>
                            <Button leftIcon={<AiOutlinePlus fontSize={'20px'} />} onClick={onOpen} colorScheme="teal" variant="outline" maxW="300px"
                                minW="150px">Nouveau(+)
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
                                    records.map((emprunteur, index) => {
                                        return <tr key={index}>
                                            <td>{emprunteur.nomEmprunteur}</td>
                                            <td>{emprunteur.prenomEmprunteur}</td>
                                            <td>{emprunteur.telEmprunteur}</td>
                                            <td>{emprunteur.adresseEmprunteur}</td>
                                            <td>
                                                <button onClick={() => { handlEdit(emprunteur); onOpen(); }} className='btn btn btn-primary'><AiFillEdit /></button>
                                                <button onClick={() => handlDelete(emprunteur.idEmprunteur)} className='btn btn btn-danger'><AiFillDelete /></button>
                                            </td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                        <nav>
                            <ul className='pagination'>
                                <li className='page-item'>
                                    <a className='page-link' onClick={prevPage}> Precedent</a>
                                </li>
                                {
                                    numbers.map((n, i) => (
                                        <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                            <a className='page-link'
                                                onClick={() => changePage(n)}
                                            >{n}</a>
                                        </li>
                                    ))
                                }
                                <li className='page-item'>
                                    <a className='page-link' onClick={nextPage}>Suivant</a>
                                </li>
                            </ul>
                        </nav>
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
                                        <FormLabel>Nom</FormLabel>
                                        <Input ref={initialRef} type='text' placeholder="Veuillez entrer ici le nom!" name='nomEmprunteur' onChange={e => setValues({ ...values, nomEmprunteur: e.target.value })} value={values.nomEmprunteur} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Prénom</FormLabel>
                                        <Input type={'text'} placeholder="Veuillez entrer ici le prénom!" name='prenomEmprunteur' onChange={e => setValues({ ...values, prenomEmprunteur: e.target.value })} value={values.prenomEmprunteur} />
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel>Téléphone</FormLabel>
                                        <Input type='text' placeholder="Veuillez entrer ici le numéro téléphone!" name='telEmprunteur' onChange={e => setValues({ ...values, telEmprunteur: e.target.value })} value={values.telEmprunteur} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Adresse</FormLabel>
                                        <Input type='text' placeholder="Veuillez entrer ici l'adresse!" name='adresseEmprunteur' onChange={e => setValues({ ...values, adresseEmprunteur: e.target.value })} value={values.adresseEmprunteur} />
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
            </Container>
        </div>
    )
}

export default Emprunteur