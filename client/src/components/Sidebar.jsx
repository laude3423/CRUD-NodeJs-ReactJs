import React, { useState } from 'react';
import '../index.css';
import { FaBars, FaMoon, FaPersonBooth, FaUserLock, FaUserFriends, FaBook, FaHome } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';

const Sidebar = ({ children }) => {
    const [theme, setTheme] = useLocalStorage('theme' ? 'dark' : 'light');

    const switchTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme)
    }

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);


    const menuItem = [
        {
            path: '/',
            name: "Login",
            icon: <FaUserLock />
        },
        {
            path: '/home',
            name: "Home",
            icon: <FaHome />
        },
        {
            path: '/emprunt',
            name: "Emprunt",
            icon: <FaPersonBooth />
        },
        {
            path: '/emprunteur',
            name: "Emprunteur",
            icon: <FaUserFriends />
        },
        {
            path: '/livre',
            name: "Livre",
            icon: <FaBook />
        },

    ]

    return (

        <div className='containere' data-theme={theme}>
            <div className='sidebar' style={{ width: isOpen ? "170px" : "50px" }}>
                <div className='top_section'>
                    <h1 className='logo' style={{ display: isOpen ? "block" : "none" }}>Logo</h1>
                    <div className='bars' style={{ marginLeft: isOpen ? "50px" : "0px" }}>
                        <FaBars onClick={toggle} />
                    </div>
                </div>
                {
                    menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className="link" activeclassName="active">
                            <div className="icon">{item.icon}</div>
                            <div className="link_text" style={{ display: isOpen ? "block" : "none" }}>{item.name}</div>
                        </NavLink>
                    ))
                }
                <div className="menu-bar">
                    <div className="menu">
                        <li className="mode"><br></br>
                            <div className="moon-sun">
                                <i className="moon"><FaMoon /></i>
                                <span className="mode-text text" style={{ display: isOpen ? "block" : "none" }}>Dark mode</span>
                                <div className="toggle-switch">
                                    <span className="switch" onClick={switchTheme}></span>
                                </div>
                            </div>
                        </li>
                    </div>
                </div>
            </div>
            <main className='main'>{children}</main>
        </div>

    )
}

export default Sidebar