import React, { useContext } from 'react';
import { useLocation, useHistory, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../../contexts';
import { setAuthToken } from '../../utils';

const Nav = styled.nav`
  margin: 0 auto 2.5rem;
  padding: 2rem 0;
  max-width: 100rem;
  width: 100%;
  font-size: 1.25rem;
  font-weight: bold;
`;

const NavList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
  margin: 0 -1rem;
`;

const NavItem = styled.li`
  margin: 0 0.5rem;
  white-space: nowrap;

  @media (max-width: 32em) {
    margin-bottom: 1rem;
  }

  &:first-of-type {
    flex-grow: 1;

    @media (max-width: 32em) {
      flex-basis: 100%;
    }
  }

  a {
    padding: 0.5rem;

    &:hover {
      opacity: 0.875;
    }
  }
`;

const Logo = styled.h1`
  color: #5E81AC;
  font-size: 2rem;
  white-space: nowrap;
`;

const NicknameNavItem = styled(NavItem)`
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
`;

const UserNickname = styled(NavLink)`
  display: inline-block;
  max-width: 10rem;
  padding: 0 !important;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  &:hover {
    color: #8FBCBB;
  }
`;

function Navbar() {
  const location = useLocation();
  const history = useHistory();
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    setAuthToken('');
    setUser(null);

    if (location.pathname !== '/') {
      history.push('/');
    }
  }

  return (
    <Nav>
      <NavList>
        <NavItem>
          <Logo>
            <NavLink to="/" replace>Blog</NavLink>
          </Logo>
        </NavItem>

        <NavItem>
          <NavLink to="/articles" activeStyle={{ color: '#88C0D0' }}>Articles</NavLink>
        </NavItem>

        {user ? (
          <>
            <NavItem>
              <NavLink to="/new-post" activeStyle={{ color: '#88C0D0' }} replace>New Post</NavLink>
            </NavItem>
            <NicknameNavItem>
              <UserNickname to={`/authors/${user.id}`} replace>{user.nickname}</UserNickname>{', '}
              <NavLink to="/" onClick={handleLogout} replace>Log out</NavLink>
            </NicknameNavItem>
          </>
        ) : (
            <>
              <NavItem>
                <NavLink to="/signup" activeStyle={{ color: '#88C0D0' }} replace>Sign Up</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/login" activeStyle={{ color: '#88C0D0' }} replace>Log In</NavLink>
              </NavItem>
            </>
          )}
      </NavList>
    </Nav>
  );
}

export default Navbar;
