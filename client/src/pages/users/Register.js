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
const Register = () => {
    const [data, setData] = useState([]);
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
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


    const [values, setValues] = useState({
        ID: '',
        Nom: '',
        Email: '',
        Password: '',
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
        axios.put('http://localhost:8081/updateUser/' + id, values)
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
        axios.post('http://localhost:8081/register', values)
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
        axios.get(`http://localhost:8081/users`)
            .then(res => setData(res.data))
            .catch(err => console.log(err));

    }
    const vider = () => {
        setValues("");
    }
    const handlEdit = (user) => {
        setValues({ ...values, ID: user.ID, Nom: user.Nom, Email: user.Email, Password: user.Password });
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
                            <span className="fs-5 fw-bolder d-none d-sm-inline">Admin Acceuil</span>
                        </a>
                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                            <li>
                                <Link to="/adminHome" className="link text-white">
                                    <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">Acceuil</span> </Link>
                            </li>
                            <li>
                                <Link to="/empruntAudit" className="link text-white">
                                    <i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Emprunt</span> </Link>
                            </li>
                            <li>
                                <Link to="/emprunteurAudit" className="link text-white">
                                    <i className="fs-4 bi-person"></i> <span className="ms-1 d-none d-sm-inline">Emprunteur</span></Link>
                            </li>
                            <li>
                                <Link to="/livreAudit" className="link text-white">
                                    <i className="fs-4 bi-book"></i> <span className="ms-1 d-none d-sm-inline">Livre</span></Link>
                            </li>
                            <li>
                                <Link className="link active">
                                    <i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Gérer user</span></Link>
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
                        <h4 style={{ fontWeight: "bold" }}>Gestion d'utilisateur</h4>
                    </div>
                    <div className='App'>
                        <Container maxW={'full'} p="4" fontSize={'18px'}>
                            <Box rounded="lg" boxShadow="base" p="4" maxW={'full'}>

                                <Box mt="5" rounded={'lg'} boxShadow="base">
                                    <Box p="4" display={'flex'} justifyContent="space-between">
                                        <Text fontSize="xl" fontWeight="bold">
                                            Liste des Utilisateurs
                                        </Text>
                                        <Button leftIcon={<AiOutlinePlus fontSize={'20px'} />} onClick={onOpen} colorScheme="teal" variant="outline" maxW="300px"
                                            minW="150px">Nouveau
                                        </Button>
                                    </Box>

                                    <table className='table'>
                                        <thead>
                                            <tr>
                                                <th>Nom</th>
                                                <th>Email</th>
                                                <th>Password</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                records.map((user, index) => {
                                                    return <tr key={index}>
                                                        <td>{user.Nom}</td>
                                                        <td>{user.Email}</td>
                                                        <td>{user.Password}</td>
                                                        <td>
                                                            <button onClick={() => { handlEdit(user); onOpen(); }} className='btn btn btn-primary'><AiFillEdit /></button>
                                                            <button onClick={() => handlDelete(user.ID)} className='btn btn btn-danger'><AiFillDelete /></button>
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
                                                    <Input type='hidden' onChange={e => setValues({ ...values, ID: e.target.value })} value={values.ID} />
                                                </FormControl>
                                                <FormControl>
                                                    <FormLabel>Nom</FormLabel>
                                                    <Input ref={initialRef} type='text' placeholder="Veuillez entrer ici le nom!" name='Nom' onChange={e => setValues({ ...values, Nom: e.target.value })} value={values.Nom} />
                                                </FormControl>
                                                <FormControl>
                                                    <FormLabel>Email</FormLabel>
                                                    <Input type={'email'} placeholder="Veuillez entrer ici l'email!" name='Email' onChange={e => setValues({ ...values, Email: e.target.value })} value={values.Email} />
                                                </FormControl>

                                                <FormControl>
                                                    <FormLabel>Password</FormLabel>
                                                    <Input type='password' placeholder="Veuillez entrer ici le mot de passe!" name='Password' onChange={e => setValues({ ...values, Password: e.target.value })} value={values.Password} />
                                                </FormControl>
                                            </ModalBody>

                                            <ModalFooter>
                                                <Button colorScheme='blue' mr={3} onClick={() => (values.ID ? onUpdate(values.ID) : onAdd())}>
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

export default Register