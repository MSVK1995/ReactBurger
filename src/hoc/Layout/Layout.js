import React, { Component } from 'react';
import Aux from '../_Aux/aux';
import classes from './Layout.css';
import Toolbar from '../../components/Toolbar/Toolbar';
import SideDrawer from '../../components/Toolbar/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    };

    menuToggleHandler = () =>{
        this.setState((prevState) =>{
            return {showSideDrawer: !prevState.showSideDrawer};
        });
    }

    sideDrawerHandler = () =>{
        this.setState({showSideDrawer: false});
    }
    render() {
        return (
            <Aux>
                <Toolbar menuClicked = {this.menuToggleHandler}/>
                <SideDrawer open = {this.state.showSideDrawer} closed = {this.sideDrawerHandler}/>
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;