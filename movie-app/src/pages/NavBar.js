import React, {useContext, useState} from 'react';
import {Link, Outlet} from "react-router-dom";
import {UserContext} from "../App";

/**
 * this is the navigation bar that handles navigation between the market and the cart pages.
 * @returns {JSX.Element} returns the html for the navigation bar
 * @constructor
 */
const NavBar = ()=>{
    const n = useContext(UserContext);  //number of current items in cart.
    return(
        <>
            <nav className="navbar fixed-top navbar-expand-lg bg-info">
                <div className="container-fluid">
                    <div className="row w-100">
                        <div className="col text-start border-end">
                            <Link className="nav-link text-center" to="/">Market</Link>
                        </div>
                        <div className="col text-end">
                            <Link className="nav-link text-center" to="/Cart">Cart {!n.numOfItems ? "" :
                                <span className="text-danger ">new movie/s added to car ({n.numOfItems})</span>
                            }</Link>
                        </div>
                    </div>
                </div>
            </nav>



        <Outlet />
    </>
    );
}
export default NavBar;

