import React from "react";
import axios from "axios";

const Header = () => {
        const handleLogout = () => {
            axios.post('/logout')
                .then(response => {
                    console.log(response.data);
                    window.location.href = "/login";
                })
                .catch(error => {
                    console.error('Logout error:', error);
                });
        };

    return (
        <header className="header-sticky" >

            <nav className="navbar navbar-expand-xl" style={{ backgroundColor: '#830823', height: '70px' }}>
                <div className="container-fluid wrapper-header">

                    <a className="navbar-brand" href="#">
                        <h5 className="text-white mt-2">e-hospital</h5>
                    </a>

                    <button
                        className="navbar-toggler ms-auto mx-3 me-md-0 p-0 p-sm-2 mb-1"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarCollapse"
                        aria-controls="navbarCollapse"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-animation">
                            <span className="bg-white" />
                            <span className="bg-white" />
                            <span className="bg-white" />
                        </span>
                    </button>

                    <div className="navbar-collapse collapse text-center" id="navbarCollapse">
                        <ul className="navbar-nav navbar-nav-scroll mx-auto">

                            <div>
                                <a className="nav-item btn btn-sm mb-0 d-none d-xl-block custom-btn" href="#">
                                    <i className="bi bi-house" /> &nbsp;Dashboard
                                </a>

                                <li className="nav-item d-block d-lg-none text-start">
                                    <a className="nav-link" href="#">
                                        Dashboard
                                    </a>
                                </li>
                            </div>

                            <div>
                                <a className="nav-item btn btn-sm mb-0 d-none d-xl-block custom-btn" href="#">
                                    <i className="bi bi-list" /> &nbsp;Requests
                                </a>

                                <li className="nav-item d-block d-lg-none text-start">
                                    <a className="nav-link" href="#">
                                        Requests
                                    </a>
                                </li>
                            </div>

                            <div>
                                <a className="nav-item btn btn-sm mb-0 d-none d-xl-block custom-btn" href="#">
                                    <i className="bi bi-chat-left-text" /> &nbsp;Feedbacks
                                </a>

                                <li className="nav-item d-block d-lg-none text-start">
                                    <a className="nav-link" href="#">
                                        Feedbacks
                                    </a>
                                </li>
                            </div>

                            <div>
                                <a className="nav-item btn btn-sm mb-0 d-none d-xl-block custom-btn" href="#">
                                    <i className="bi bi-file-earmark-text" /> &nbsp;Reports
                                </a>

                                <li className="nav-item d-block d-lg-none text-start">
                                    <a className="nav-link" href="#">
                                        Reports
                                    </a>
                                </li>
                            </div>

                            <div>
                                <a className="nav-item btn btn-sm mb-0 d-none d-xl-block custom-btn" href="#">
                                    <i className="bi bi-person" /> &nbsp;Patient
                                </a>

                                <li className="nav-item d-block d-lg-none text-start">
                                    <a className="nav-link" href="#">
                                        Patient
                                    </a>
                                </li>
                            </div>

                            <div>
                                <a className="nav-item btn btn-sm mb-0 d-none d-xl-block custom-btn dropdown-toggle" href="#">
                                    <i className="bi bi-gear" /> &nbsp;Settings
                                </a>

                                <li className="nav-item d-block d-lg-none text-start">
                                    <a className="nav-link" href="#">
                                        Settings
                                    </a>
                                </li>
                            </div>
                        </ul>
                    </div>



                    <ul className="nav flex-row align-items-center list-unstyled ms-xl-auto ms-md-3 ms-1">

                        <li className="nav-item ms-0 dropdown">

                            <a
                                className="nav-link p-0"
                                href="#"
                                role="button"

                            >
                                <i className="bi bi-moon-stars fa-fw fs-5 text-white" />
                            </a>
                        </li>
                        <li className="nav-item ms-0 ms-3 dropdown">

                            <a
                                className="nav-link p-0"
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                data-bs-auto-close="outside"
                            >
                                <i className="bi bi-bell fa-fw fs-5 text-white" />
                            </a>

                            <div className="dropdown-menu dropdown-animation dropdown-menu-end dropdown-menu-size-md p-0 shadow-lg">
                                <div className="card bg-transparent">

                                    <div className="card-header bg-transparent d-flex justify-content-between align-items-center border-bottom">
                                        <h6 className="m-0">
                                            Notifications{" "}

                                        </h6>
                                        <a className="small" href="#">
                                            Clear all
                                        </a>
                                    </div>

                                    <div className="card-body p-0">
                                        <ul className="list-group list-group-flush list-unstyled p-2">

                                            <li>
                                                <div className="mt-3 mb-3  text-center">
                                                    <span className="text-secondary">No Notification</span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li className="nav-item ms-0 ms-md-3 d-none d-lg-block">
                            <div className="separator" />
                        </li>

                        <li className="d-flex align-items-center d-none d-lg-block">
                            <p className="text-white mb-0 text-end" style={{ lineHeight: '1.3' }}>
                                <span className="text-white-50" style={{ fontSize: '12px' }}>Welcome</span><br />
                                <span className="fw-bold" style={{ fontSize: '14px' }}>Admin</span>
                            </p>
                        </li>

                        <li className="nav-item ms-3 dropdown">
                            <a
                                className="avatar avatar-xs p-0 dropdown-toggle"
                                href="#"
                                id="profileDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={{ textDecoration: 'none' }}
                            >
                                <img
                                    className="avatar-img rounded-circle"
                                    src="https://img.freepik.com/premium-vector/anonymous-user-circle-icon-vector-illustration-flat-style-with-long-shadow_520826-1931.jpg"
                                    alt="avatar"

                                />
                                <i className="ms-2" style={{ fontSize: '1.5rem' }} />
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                                <li>
                                    <button
                                        className="dropdown-item"
                                        onClick={handleLogout}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </li>


                    </ul>

                </div>
            </nav>

        </header>
    );
};

export default Header;
