import { FC } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink } from 'react-router-dom';

const Header: FC = () => {
  const isAuth = true
  return (
    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
            <Link to='/'> Логотип </Link>
            {isAuth && (
                <Nav className="me-auto">
                    <NavLink className="ms-3" to={'/'}>Home</NavLink>
                    <NavLink className="ms-3" to={'#'}>Trainer</NavLink>
                </Nav>
            )}

            {
                isAuth ? (
                    <NavLink to={'#'}>Log out</NavLink>
                ) : (
                    <Link to={'auth'}>Log in/Sigh in</Link>
                )
            }

        </Container>
    </Navbar>
  )
}

export default Header
