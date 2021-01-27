import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../../contexts';
import { setAuthToken } from '../../utils';
import { register, getMe } from '../../WebAPI';
import { Form, FormControl, FormLabel, FormInput, FormSubmit, FormSubmitButton, ErrorMessage } from '../../components/Form';

const Main = styled.main`
  flex-grow: 1;
`;

function SignUpPage() {
  const history = useHistory();
  const { setUser } = useContext(AuthContext);
  const [nickname, setNickname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage(null);

    register({ nickname, username, password }).then(data => {
      if (data.ok !== 1) return setErrorMessage(data.message);
      setAuthToken(data.token);

      getMe().then(response => {
        if (response.ok !== 1) {
          setAuthToken(null);
          return setErrorMessage(response.toString());
        }
        setUser(response.data);
        history.push('/');
      })
    });
  }

  return (
    <Main>
      <Form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel htmlFor="nickname">Nickname</FormLabel>
          <FormInput name="nickname" id="nickname" value={nickname} maxLength={32} onChange={(e) => setNickname(e.target.value)} />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="username">Username</FormLabel>
          <FormInput name="username" id="username" value={username} maxLength={32} onChange={(e) => setUsername(e.target.value)} />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <FormInput type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>

        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

        <FormSubmit>
          <FormSubmitButton>Sign Up</FormSubmitButton>
        </FormSubmit>
      </Form>
    </Main>
  );
}

export default SignUpPage;
