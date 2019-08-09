import React from 'react';
import { Link } from 'react-router-dom';

import { Container } from './styles';

export default function Dashboard() {
  return (
    <Container>
      <h1>Crie e compartilhe links</h1>
      <Link to="/login">Ja tenho login</Link>
      <Link to="/register">Criar conta gratuita</Link>
    </Container>
  );
}
