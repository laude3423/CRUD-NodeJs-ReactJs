import axios from 'axios';
import React, { useEffect, useState } from 'react'
import dateFormat from 'dateformat';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Container, FormControl, Input, Text } from '@chakra-ui/react';
import { AiFillDelete, AiOutlinePlus, AiOutlineSearch, AiFillEdit, AiOutlineReload } from 'react-icons/ai';
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
    const [search, setSearch] = useState("")
    const navigate = useNavigate();

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
        axios.get('http://localhost:8081/searchLivre/' + search)
            .then(res => {
                setData(res.data)
                setSearch("");
            })
            .catch(err => console.log(err));
    }

    const [values, setValues] = useState({
        idLivre: '',
        titreLivre: '',
        auteurLivre: '',
        editeurLivre: '',
        nombre: '',
        dateParution: ''
    });
    const handleLogout = () => {
        if (window.confirm('Souhaitez-vous vraiment vous déconnecter?')) {
            axios.get('http://localhost:8081/logout')
                .then(res => {
                    navigate('/')
                }).catch(err => console.log(err));
        }
    }
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
                vider();
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
                vider();
            })
            .catch(err => console.log(err))
    }
    const getList = () => {
        axios.get(`http://localhost:8081/livre`)
            .then(res => setData(res.data))
            .catch(err => console.log(err));

    }
    const vider = () => {
        setValues("");
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
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                        <a href="/" className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">
                            <span className="fs-5 fw-bolder d-none d-sm-inline">User Acceuil</span>
                        </a>
                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                            <li>
                                <Link to="/" className="link text-white">
                                    <i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline">Acceuil</span> </Link>
                            </li>
                            <li>
                                <Link to="/emprunt" className="link text-white">
                                    <i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Emprunt</span> </Link>
                            </li>
                            <li>
                                <Link to="/emprunteur" className="link text-white">
                                    <i className="fs-4 bi-person"></i> <span className="ms-1 d-none d-sm-inline">Emprunteur</span></Link>
                            </li>
                            <li>
                                <Link to="/livre" className="link active">
                                    <i className="fs-4 bi-person"></i> <span className="ms-1 d-none d-sm-inline">Livre</span></Link>
                            </li>
                            <li onClick={handleLogout}>
                                <a href="#" className="link text-white">
                                    <i className="fs-4 bi-power"></i> <span className="ms-1 d-none d-sm-inline">Logout</span></a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col p-0 m-0">
                    <div className='p-2 d-flex justify-content-center shadow'>
                        <h4 style={{ fontWeight: "bold" }}>Système de gestion de bibliothèque</h4>
                    </div>
                    <div className='App'>
                        <Container maxW={'full'} p="4" fontSize={'18px'}>
                            <Box rounded="lg" boxShadow="base" p="4" maxW={'full'}>
                                <Text fontSize="xl" fontWeight="bold">Gestion de Livre</Text>
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
                                            Liste des livres
                                        </Text>
                                        <Button leftIcon={<AiOutlinePlus fontSize={'20px'} />} onClick={onOpen} colorScheme="teal" variant="outline" maxW="300px"
                                            minW="150px">Nouveau
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
                                                records.map((livre, index) => {
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
                </div>
            </div>
        </div>
    )
}

export default Livre