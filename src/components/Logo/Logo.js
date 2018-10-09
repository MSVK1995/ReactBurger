import React from 'react';
import LogoImg from '../../assets/images/burger-logo.png';
import classes from './Logo.css';

const logo = () =>(
    <div className = {classes.Logo}>
        <img src = {LogoImg} alt = "MyBurger"/>
    </div>
);

export default logo;