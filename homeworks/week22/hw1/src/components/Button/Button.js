import styled from 'styled-components';

export const Button = styled.button`
  border: 1px solid;
  border-radius: 64rem;
  padding: 1rem 2rem;
  font-size: 1.125rem;
  font-weight: bold;
  transition: all 0.4s ease;
`;

export const PrimaryButton = styled(Button)`
  background: #D8DEE9;
  border-color: #D8DEE9;
  color: #4C566A;

  &:focus,
  &:hover {
    background: none;
    color: #D8DEE9;
  }
`;
