import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NewReading from "./pages/NewReading";
import History from "./pages/History";
import { Container, Navbar, Nav, NavItem } from "reactstrap";

const App: React.FC = () => {
    return (
        <Router>
            <Navbar color="dark" dark expand="md">
                <Container>
                    <Link className="navbar-brand" to="/">
                        Tarot App
                    </Link>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Link className="nav-link" to="/new">
                                Nova Tiragem
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link className="nav-link" to="/history">
                                Histórico
                            </Link>
                        </NavItem>
                    </Nav>
                </Container>
            </Navbar>

            <Container className="mt-4">
                <Routes>
                    <Route
                        path="/"
                        element={<div>Bem-vindo ao Tarot App</div>}
                    />
                    <Route path="/new" element={<NewReading />} />
                    <Route path="/history" element={<History />} />
                </Routes>
            </Container>
        </Router>
    );
};

export default App;
