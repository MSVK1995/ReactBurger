import React from 'react';
import classes from './Toolbar.css';
import Logo from '../Logo/Logo';
import NavigationItems from './Navigation/NavigationItems/NavigationItems';
import MenuDrawer from './Navigation/SideDrawer/MenuDrawer/MenuDrawer';

const toolbar = (props) =>{
    return(
        <header className = {classes.Toolbar}>
            <MenuDrawer toggleMenu = {props.menuClicked}/>
            <div className = {classes.Logo}> 
                <Logo />
            </div>
            <nav className = {classes.DesktopOnly}>
                <NavigationItems />
            </nav>
        </header>
    );
};

export default toolbar;