import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from './contexts';
import { getMe } from './WebAPI';
import { getAuthToken, setAuthToken } from './utils';
import { Navbar, Footer } from './layouts';
import { ArticlesPage, EditPostPage, HomePage, LoginPage, NewPostPage, SignUpPage, SinglePostPage, UserPostsPage } from './pages';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 2rem;
  height: 100%;
`;

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!getAuthToken()) return;

    getMe().then(response => {
      if (response.ok !== 1) return setAuthToken(null);
      setUser(response.data);
    })
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Wrapper>
        <Router>
          <Navbar />

          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/posts/:id" component={SinglePostPage} />
            <Route exact path="/articles/:page" component={ArticlesPage} />
            <Route exact path="/authors/:userId" component={UserPostsPage} />
            <Route exact path="/new-post" component={NewPostPage} />
            <Route exact path="/posts/:id/edit" component={EditPostPage} />
            <Route exact path="/signup" component={SignUpPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/articles">
              <Redirect to="/articles/1" />
            </Route>
          </Switch>

          <Footer />
        </Router>
      </Wrapper>
    </AuthContext.Provider>
  );
}

export default App;
