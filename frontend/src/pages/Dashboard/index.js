import React, { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import api from '~/services/api';

import { Container, NewLink } from './styles';

const schema = Yup.object().shape({
  title: Yup.string().required('Title obrigatorio'),
  url: Yup.string()
    .min(4, 'Minimo 4 caracteres')
    .required('Custom URL obrigatorio'),
  redirect_url: Yup.string()
    .min(6, 'Minimo 6 caracteres')
    .required('URL'),
});

export default function Dashboard() {
  const [page, setPage] = useState(1);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSubmit({ title, url, redirect_url }) {
    setLoading(true);

    try {
      const response = await api.post('/new/link', {
        title,
        url,
        redirect_url,
      });

      if (links.length >= 1) {
        setLinks([response.data, ...links]);
      } else {
        setLinks([response.data]);
      }
    } catch (error) {
      toast.error(String(error), {
        position: toast.POSITION.TOP_RIGHT,
      });
    }

    setLoading(false);
  }

  return (
    <Container>
      <NewLink>
        <Form schema={schema} onSubmit={handleSubmit}>
          <Input autoComplete="off" name="title" placeholder="Title" />
          <Input autoComplete="off" name="url" placeholder="Custom URL" />
          <Input autoComplete="off" name="redirect_url" placeholder="URL" />

          <button type="submit">
            {loading ? 'Carregando...' : 'Criar conta'}
          </button>
        </Form>
      </NewLink>

      {links.map(link => (
        <p key={link.id}>{link.id}</p>
      ))}
    </Container>
  );
}
