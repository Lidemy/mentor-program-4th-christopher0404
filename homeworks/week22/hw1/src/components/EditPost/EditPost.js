import React from 'react';
import styled from 'styled-components';
import { PrimaryButton } from '../Button';

const Main = styled.main`
  flex-grow: 1;
  margin-bottom: 2.5rem;
`;

const EditPostContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 50rem;
  margin: 0 auto;
`;

const EditPostTitle = styled.input`
  margin-bottom: 2.5rem;
  border: none;
  padding: 0;
  font-size: 2.5rem;
  font-weight: bold;

  &:focus {
    outline: none;
  }
`;

const EditPostContent = styled.textarea`
  appearance: none;
  background: transparent;
  flex-grow: 1;
  margin-bottom: auto;
  border: none;
  width: 100%;
  height: 100%;
  font-size: 1.125rem;
  line-height: 2;
  resize: none;

  &:focus {
    outline: none;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
`;

const SubmitButton = styled(PrimaryButton)``;

function EditPost({ title, setTitle, body, setBody, onPost, submitButtonValue }) {
  return (
    <Main>
      <EditPostContainer>
        <EditPostTitle
          placeholder="Title"
          defaultValue={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <EditPostContent
          placeholder="Tell your story"
          defaultValue={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <ButtonContainer>
          <SubmitButton onClick={onPost}>{submitButtonValue}</SubmitButton>
        </ButtonContainer>
      </EditPostContainer>
    </Main>
  );
}

export default EditPost;
