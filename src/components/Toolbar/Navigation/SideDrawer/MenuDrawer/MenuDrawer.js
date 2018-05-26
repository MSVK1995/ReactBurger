import React from 'react';
import classes from './MenuDrawer.css';
const menuDrawer = (props) =>(
    <div 
        onClick = {props.toggleMenu}
        className = {classes.MenuDrawer}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default menuDrawer;