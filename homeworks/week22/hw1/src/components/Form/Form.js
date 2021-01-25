import styled from 'styled-components';
import { PrimaryButton } from '../Button';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 32rem;
  margin: 0 auto 2.5rem;
`;

export const FormControl = styled.div`
  margin-bottom: 2.5rem;
`;

export const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
  font-weight: 600;
`;

export const FormInput = styled.input`
  border: 1px solid #D8DEE9;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  width: 100%;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 1px;
`;

export const FormSubmit = styled.div`
  padding: 1rem 0;
  text-align: center;
`;

export const FormSubmitButton = styled(PrimaryButton)`
  margin: 0 auto;
`;

export const ErrorMessage = styled.p`
  margin-bottom: 1rem;
  color: #BF616A;
`;
