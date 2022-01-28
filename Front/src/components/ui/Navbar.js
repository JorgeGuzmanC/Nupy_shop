
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import './NavBar.css';
import { autenticacionService } from "../../services/autenticacion";


export const Navbar = () => {

    const navigate = useNavigate();

    const handleLogout = async(e) => {
        e.preventDefault();
       // console.log(localStorage.auth_token);
        await autenticacionService.logout(localStorage.auth_token);
        localStorage.clear();
        
        navigate('/login', {
            replace:true
        }
        );
    }
    const [active, setActive] = useState("nav__menu");
  const [icon, setIcon] = useState("nav__toggler");
  const navToggle = () => {
    if (active === "nav__menu") {
      setActive("nav__menu nav__active");
    } else setActive("nav__menu");

    // Icon Toggler
    if (icon === "nav__toggler") {
      setIcon("nav__toggler toggle");
    } else setIcon("nav__toggler");
  };
  return (
    <nav className="nav">


      <Link  
      
      className="nav__brand" to= "/">
       NUPY
       
      </Link>

      <ul className={active}>
        <li className="nav__item">
            <NavLink to="/caja">Caja</NavLink>
        </li>
        <li className="nav__item">
            <NavLink to="/editor">Editor</NavLink>
        </li>
        <li className="nav__item">
            <NavLink to="/pedidos" >Pedidos</NavLink>
        </li>
        <li className="nav__item">
            <NavLink to="/reporte" >Reporte</NavLink>
        </li>

        <li className="nav_item">
            <button className="nav-item nav-link btn" onClick={ handleLogout }>
                Logout
            </button>
        </li>
        

        
      </ul>
      <div onClick={navToggle} className={icon}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
}

