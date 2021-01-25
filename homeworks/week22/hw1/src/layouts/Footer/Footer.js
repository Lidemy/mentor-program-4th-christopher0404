import styled from 'styled-components';

const FooterContainer = styled.footer`
  padding: 1rem 0 2rem;
`;

const CopyRight = styled.p`
  text-align: center;
  font-size: 1rem;
  font-weight: bold;
`;

function Footer() {
  return (
    <FooterContainer>
      <CopyRight>© 2021 Christopher Chu</CopyRight>
    </FooterContainer>
  );
}

export default Footer;
