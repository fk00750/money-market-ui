import React from 'react'

function Header() {
    return (
        <header id="header" className="header sticky-top d-flex align-items-center">
            <div className="container d-flex align-items-center justify-content-between">

                <div id="logo">
                    <h1><a href="index.html"><span>Money</span>Market</a></h1>
                </div>

                <nav id="navbar" className="navbar">
                    <ul>
                        <li><a className="nav-link scrollto active" href="#hero">Home</a></li>
                        <li><a className="nav-link scrollto" href="#about-us">About</a></li>
                        <li><a className="nav-link scrollto" href="#features">Features</a></li>
                        <li><a className="nav-link scrollto" href="#screenshots">Documentation</a></li>
                        <li><a className="nav-link scrollto" href="#login">Login</a></li>
                    </ul>
                    <i className="bi bi-list mobile-nav-toggle"></i>
                </nav>
            </div>
        </header>
    )
}

export default Header