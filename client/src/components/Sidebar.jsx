import React, { useState } from 'react';
import '../index.css';
import { FaTh, FaBars, FaShoppingBag, FaMoon, FaCommentAlt, FaRegChartBar, FaUserAlt, FaUserLock } from "react-icons/fa";
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

    const menutem = [
        {
            path: '/',
            name: "Loging",
            icon: <FaUserLock />
        },
        {
            path: '/acceuil',
            name: "Acceuil",
            icon: <FaTh />
        },
        {
            path: '/emprunt_audit',
            name: "EmpruntAudit",
            icon: <FaUserAlt />
        },
        {
            path: '/emprunteur_audit',
            name: "EmprunteurAudit",
            icon: <FaRegChartBar />
        },
        {
            path: '/exemplaire_audit',
            name: "ExemplaireAudit",
            icon: <FaCommentAlt />
        },
        {
            path: '/livre_audit',
            name: "Livre",
            icon: <FaShoppingBag />
        },
    ]


    const menuItem = [
        {
            path: '/',
            name: "Loging",
            icon: <FaUserLock />
        },
        {
            path: '/acceuil',
            name: "Acceuil",
            icon: <FaTh />
        },
        {
            path: '/emprunt',
            name: "Emprunt",
            icon: <FaUserAlt />
        },
        {
            path: '/emprunteur',
            name: "Emprunteur",
            icon: <FaRegChartBar />
        },
        {
            path: '/exemplaire',
            name: "Exemplaire",
            icon: <FaCommentAlt />
        },
        {
            path: '/livre',
            name: "Livre",
            icon: <FaShoppingBag />
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
            <main>{children}</main>
        </div>

    )
}

export default Sidebar