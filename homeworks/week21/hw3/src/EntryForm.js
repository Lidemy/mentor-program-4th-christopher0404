import { Component } from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
  margin: 0 auto;
  max-width: 32rem;
`;

const FormTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 2.5rem;
`;

const StyledInputGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 0.75rem;
  font-size: 1.5rem;
  font-weight: 600;
`;

const StyledInput = styled.input`
  margin-bottom: 0.25rem;
  border: 1px solid #4C566A;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  width: 100%;
  font-size: 1rem;
  letter-spacing: 1px;
  transition: background 1s;

  &:focus,
  &:hover {
    background: #fafafa;
  }

  ${props => (props.isEmpty || !props.isValid) && `
    border-color: #BF616A;
  `}
`;

const ErrorMessage = styled.p`
  color: #BF616A;
  text-align: right;

  ${props => (props.textAlign === 'left') && `
    text-align: left;
  `}
`;

const StyledSelect = styled.select`
  border-radius: 0.5rem;
  padding: 0.5rem;
  font-size: 1.25rem;
  cursor: pointer;
`;

const StyledSmallLabel = styled.label`
  margin-left: 0.5rem;
  font-size: 1.125rem;
  cursor: pointer;
`;

const StyledTextArea = styled.textarea`
  resize: vertical;
  border-radius: 0.5rem;
  padding: 1rem;
  width: 100%;
  font-size: 1.25rem;
  line-height: 1.25;
  letter-spacing: 1px;
`;

const StyledButton = styled.button`
  border: 1px solid #4C566A;
  border-radius: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #4C566A;
  color: #fff;
  font-size: 1.125rem;
  font-weight: bold;
`;

const InputGroup = ({ label, type, name, value, onChange, onBlur, isEmpty, isValid, placeholder }) => (
  <StyledInputGroup>
    <StyledLabel htmlFor={name}>{label}</StyledLabel>
    <StyledInput type={type} name={name} id={name} value={value} onChange={onChange} onBlur={onBlur} isEmpty={isEmpty} isValid={isValid} placeholder={placeholder} />
    {isEmpty && <ErrorMessage>field required</ErrorMessage>}
    {!isValid && <ErrorMessage>wrong format</ErrorMessage>}
  </StyledInputGroup>
);

const isEmailValid = email => {
  const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  return regex.test(email);
}

const isPhoneNumberValid = phoneNumber => {
  const regex = /^09\d{2}-?\d{3}-?\d{3}$/;
  return regex.test(phoneNumber);
}

class EntryForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      competitor: {
        value: '',
        isEmpty: false,
      },
      email: {
        value: '',
        isEmpty: false,
        isValid: true,
      },
      phoneNumber: {
        value: '',
        isEmpty: false,
        isValid: true,
      },
      danceStyle: {
        value: 'Freestyle',
      },
      group: {
        value: 'Upper Division',
      },
      message: {
        value: '',
      },
      agreeToPrivacyPolicy: {
        value: false,
        isEmpty: false,
      },
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    const { competitor, email, phoneNumber, danceStyle, group, agreeToPrivacyPolicy } = this.state;
    const userInputNames = Object.keys(this.state);
    const userInputValues = Object.values(this.state);

    for (let i = 0; i < userInputNames.length; i += 1) {
      const userInputName = userInputNames[i]
      const userInputValue = userInputValues[i];

      if (!userInputValue.value) {
        this.setState({
          [userInputName]: {
            ...this.state[userInputName],
            isEmpty: true,
          }
        });
      }
    }

    if (!competitor.value || !email.value || !email.isValid || !phoneNumber.value || !phoneNumber.isValid || !agreeToPrivacyPolicy.value) return;

    alert(`
      Name: ${competitor.value}
      Email: ${email.value}
      Phone: ${phoneNumber.value}
      Dance Style: ${danceStyle.value}
      Group: ${group.value}
    `);
  }

  handleInputChange = event => {
    const { target } = event;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: {
        ...this.state[name],
        value,
        isEmpty: false,
      }
    });

    if (name === 'email') {
      this.setState({
        [name]: {
          value,
          isEmpty: false,
          isValid: isEmailValid(value),
        }
      });
    }

    if (name === 'phoneNumber') {
      this.setState({
        [name]: {
          value,
          isEmpty: false,
          isValid: isPhoneNumberValid(value),
        }
      });
    }
  }

  handleInputBlur = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: {
        ...this.state[name],
        isEmpty: value ? false : true,
      }
    });
  }

  render() {
    const { competitor, email, phoneNumber, danceStyle, group, agreeToPrivacyPolicy, message } = this.state;

    return (
      <StyledForm onSubmit={this.handleSubmit}>
        <FormTitle>All Styles Dance Battle</FormTitle>

        <InputGroup label="Name" type="text" name="competitor" value={competitor.value} onChange={this.handleInputChange} onBlur={this.handleInputBlur} isEmpty={competitor.isEmpty} isValid={true} />

        <InputGroup label="Email" type="email" name="email" value={email.value} onChange={this.handleInputChange} onBlur={this.handleInputBlur} isEmpty={email.isEmpty} isValid={email.isValid} placeholder="example@gmail.com" />

        <InputGroup label="Phone" type="tel" name="phoneNumber" value={phoneNumber.value} onChange={this.handleInputChange} onBlur={this.handleInputBlur} isEmpty={phoneNumber.isEmpty} isValid={phoneNumber.isValid} placeholder="0987654321" />

        <StyledInputGroup>
          <StyledLabel htmlFor="danceStyle">Dance Style</StyledLabel>
          <StyledSelect name="danceStyle" value={danceStyle.value} id="danceStyle" onChange={this.handleInputChange}>
            <option value="Freestyle">Freestyle</option>
            <option value="Hip Hop">Hip Hop</option>
            <option value="House">House</option>
            <option value="Locking">Locking</option>
            <option value="Popping">Popping</option>
          </StyledSelect>
        </StyledInputGroup>

        <StyledInputGroup>
          <StyledLabel>Group</StyledLabel>
          <div>
            <input type="radio" name="group" id="upperDivision" value="Upper Division" onChange={this.handleInputChange} checked={group.value === 'Upper Division'} />
            <StyledSmallLabel htmlFor="upperDivision">Upper Division (18 years old and older)</StyledSmallLabel>
          </div>
          <div>
            <input type="radio" name="group" id="juniorDivision" value="Junior Division" onChange={this.handleInputChange} checked={group.value === 'Junior Division'} />
            <StyledSmallLabel htmlFor="juniorDivision">Junior Division (17 years old or younger)</StyledSmallLabel>
          </div>
        </StyledInputGroup>

        <StyledInputGroup>
          <StyledLabel>Message (optional)</StyledLabel>
          <StyledTextArea rows="8" name="message" value={message.value} onChange={this.handleInputChange} />
        </StyledInputGroup>

        <StyledInputGroup>
          <input type="checkbox" name="agreeToPrivacyPolicy" id="agreeToPrivacyPolicy" checked={agreeToPrivacyPolicy.value} onChange={this.handleInputChange} />
          <StyledSmallLabel htmlFor="agreeToPrivacyPolicy">I agree to the Privacy Policy</StyledSmallLabel>
          {agreeToPrivacyPolicy.isEmpty && <ErrorMessage textAlign="left">Please check this field</ErrorMessage>}
        </StyledInputGroup>

        <StyledButton>Submit</StyledButton>
      </StyledForm>
    )
  }
}

export default EntryForm;
