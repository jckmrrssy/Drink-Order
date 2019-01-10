import React, { Component } from "react";
import { Navbar, NavItem } from 'react-materialize'
import "./NavTabs.css";
// import "../materialize.css"

export default class NavTabs extends Component {

    goTo(route) {
        this.props.history.replace(`/${route}`)
    }

    login() {
        this.props.auth.login();
    }

    logout() {
        this.props.auth.logout();
    }


    render() {
        
        const { isAuthenticated } = this.props.auth;

        return (
            // <div className="navbar-fixed">
                <Navbar brand='drink order' className="navbar brown darken-3 navpad" right>
                    {/* Login or Logout button */}

                    {
                        !isAuthenticated() && (
                            <NavItem
                                id="qsLoginBtn"
                                className='nav-link'
                                onClick={this.login.bind(this)}>
                                Log In
                            </NavItem>
                        )
                    }
                    {
                        isAuthenticated() && (
                            <NavItem
                                id="qsLogoutBtn"
                                className="nav-link"
                                onClick={this.logout.bind(this)}>
                                Logout
                            </NavItem>
                        )
                    }

        
                    {/* Drinks list button */}
                    {
                        isAuthenticated() && (
                            <NavItem
                                onClick={this.goTo.bind(this, 'EditDrink')}
                                className="nav-link">Drinks
                            </NavItem>
                        )
                    }

                    {/* Liquor list button */}
                    {
                        isAuthenticated() && (
                            <NavItem
                                onClick={this.goTo.bind(this, 'EditLiquor')}
                                className="nav-link">Liquor
                            </NavItem>
                        )
                    }

                    {/* Drink list button */}

                   
                </Navbar>
            // </div>
        )
    }
};
