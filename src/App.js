import React from 'react';
import './App.css';
import { Theory } from "./components/Theory";
import { Grids } from "./components/Regression";
import { CodeForm } from './components/CodeForm';
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";

export default function App() {
    return (
        <Router>
            <div>
                <nav className="navbar navbar-expand-sm navbar-light bg-custom header-bar">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <a className="nav-link">
                                    <Nav.Link
                                        as={NavLink}
                                        exact
                                        to="/"
                                        activeStyle={{
                                            fontWeight: "bold",
                                            color: "black",
                                        }}
                                    >
                                        PATH VISUALIZER
                                    </Nav.Link>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link">
                                    <Nav.Link
                                        as={NavLink}
                                        exact
                                        to="/theory"
                                        activeStyle={{
                                            fontWeight: "bold",
                                            color: "black",
                                        }}
                                    >
                                        GRAPH TRAVERSAL THEORY
                                    </Nav.Link>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link">
                                    <Nav.Link
                                        as={NavLink}
                                        exact
                                        to="/traversal"
                                        activeStyle={{
                                            fontWeight: "bold",
                                            color: "black",
                                        }}
                                    >
                                        HOW THE VISUALIZER WORKS
                                    </Nav.Link>
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>

                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/theory">
                        <Theory />
                    </Route>
                    <Route path="/regression">
                        <Traversal />
                    </Route>
                    <Route path="/">
                        <Graphs />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}
