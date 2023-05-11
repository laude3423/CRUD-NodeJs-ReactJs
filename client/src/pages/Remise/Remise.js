import { Box, Button, Container, FormControl, Input, Select, Text } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AiFillDelete, AiFillEdit, AiOutlinePlus, AiOutlineSearch, AiOutlineReload, AiFillHome } from 'react-icons/ai';
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

const Remise = () => {
    const [dataRemise, setRemise] = useState([]);
    const [dataEmprunt, setEmprunt] = useState([]);

    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
    const [search, setSearch] = useState("")
    const navigate = useNavigate();
    const [values, setValues] = useState({
        idRemise: '',
        idEmprunt: '',
        dateRemise: '',
        qteRemise: '',
    });
    const handleLogout = () => {
        if (window.confirm('Souhaitez-vous vraiment vous déconnecter?')) {
            axios.get('http://localhost:8081/logout')
                .then(res => {
                    navigate('/')
                }).catch(err => console.log(err));
        }
    }
    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 4;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = dataRemise.slice(firstIndex, lastIndex);
    const npage = Math.ceil(dataRemise.length / recordsPerPage);
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
        axios.get('http://localhost:8081/searchDate/' + search)
            .then(res => {
                setEmprunt(res.data)
                setSearch("");
            })
            .catch(err => console.log(err));
    }
    const onUpdate = (id) => {
        axios.put('http://localhost:8081/updateRemise/' + id, values)
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
        console.log(values);
        axios.post('http://localhost:8081/insertRemise', values)
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
    const vider = () => {
        setValues("");
    }
    const getList = () => {
        let endpoints = ['http://localhost:8081/emprunt/', 'http://localhost:8081/remise/'];

        axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
            axios.spread(({ data: emprunt }, { data: remise }) => {

                setRemise(remise);
                setEmprunt(emprunt);
            })
        );

    }
    const handlEdit = (id) => {
        console.log(id)
        axios.get('http://localhost:8081/detailRemise/' + id)
            .then(res => {
                console.log(res.data);
                setValues({ ...values, idRemise: res.data[0].idRemise, idEmprunt: res.data[0].idEmprunt, dateRemise: res.data[0].dateRemise, qteRemise: res.data[0].qteRemise })
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        getList();
    }, [])

    const handlDelete = (id) => {
        if (window.confirm('Vous êtes sûr de supprimer?')) {
            axios.delete('http://localhost:8081/deleteRemise/' + id)
                .then(res => {
                    getList();
                })
                .catch(err => console.log(err))
        }
    }
    return (
        <div className='app'>
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                            <a href="/" className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">
                                <span className="fs-5 fw-bolder d-none d-sm-inline">User Acceuil</span>
                            </a>
                            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                                <li>
                                    <Link to="/home" className="link text-white">
                                        <i className="fs-4 bi-house"></i><span className="ms-1 d-none d-sm-inline">Acceuil</span> </Link>
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
                                    <Link to="/livre" className="link text-white">
                                        <i className="fs-4 bi-book"></i> <span className="ms-1 d-none d-sm-inline">Livre</span></Link>
                                </li>
                                <li>
                                    <Link to="/remise" className="link active">
                                        <i className="fs-4 bi-back"></i> <span className="ms-1 d-none d-sm-inline">Remise</span></Link>
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
                                    <Text fontSize="xl" fontWeight="bold">Gestion de remise du livre</Text>
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
                                                Liste des remises
                                            </Text>
                                            <Button leftIcon={<AiOutlinePlus fontSize={'20px'} />} onClick={onOpen} colorScheme="teal" variant="outline" maxW="300px"
                                                minW="150px">Nouveau(+)
                                            </Button>
                                        </Box>
                                        <table className='table'>
                                            <thead>
                                                <tr>
                                                    <th>Numéro d'emprunt</th>
                                                    <th>Qte emprunt</th>
                                                    <th>Date d'emprunt</th>
                                                    <th>Date de retour</th>
                                                    <th>Date de remise</th>
                                                    <th>Qte remis</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    records.map((remise, index) => {
                                                        return <tr key={index}>
                                                            <td>{remise.idEmprunt}</td>
                                                            <td>{remise.qte}</td>
                                                            <td>{dateFormat(remise.date, 'dd/mm/yyyy')}</td>
                                                            <td>{dateFormat(remise.retour, 'dd/mm/yyyy')}</td>
                                                            <td>{dateFormat(remise.dateRemise, 'dd/mm/yyyy')}</td>
                                                            <td>{remise.qteRemise}</td>
                                                            <td>
                                                                <button onClick={() => { handlEdit(remise.idRemise); onOpen(); }} className='btn btn btn-primary'><AiFillEdit /></button>
                                                                <button onClick={() => handlDelete(remise.idRemise)} className='btn btn btn-danger'><AiFillDelete /></button>
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
                                                        <Input type='hidden' onChange={e => setValues({ ...values, idRemise: e.target.value })} value={values.idRemise} />
                                                    </FormControl>
                                                    <FormControl>
                                                        <FormLabel>Numéro d'emprunteur</FormLabel>
                                                        <Select placeholder="Choisir numéro d'emprunt" name='idEmprunteur' onChange={e => setValues({ ...values, idEmprunt: e.target.value })} value={values.idEmprunt}>
                                                            {
                                                                dataEmprunt.map((remis, index) => (
                                                                    <option value={remis.idEmprunt}>{remis.idEmprunt}</option>

                                                                ))
                                                            }
                                                        </Select>
                                                    </FormControl>
                                                    <FormControl>
                                                        <FormLabel>Date de remis</FormLabel>
                                                        <Input type='date' name='dateRemise' onChange={e => setValues({ ...values, dateRemise: e.target.value })} value={values.dateRemise} />
                                                    </FormControl>
                                                    <FormControl>
                                                        <FormLabel>Nombre remis</FormLabel>
                                                        <Input type='number' placeholder="Veuillez entrer le nombre remis!" name='qteRemise' onChange={e => setValues({ ...values, qteRemise: e.target.value })} value={values.qteRemise} />
                                                    </FormControl>
                                                </ModalBody>

                                                <ModalFooter>
                                                    <Button colorScheme='blue' mr={3} onClick={() => (values.idRemise ? onUpdate(values.idRemise) : onAdd())}>
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
        </div>
    )
}

export default Remise