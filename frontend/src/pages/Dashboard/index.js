import React, { useEffect, useState } from 'react';

import { format, parseISO } from 'date-fns';

import ReactEcharts from 'echarts-for-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import api from '~/services/api';

import { Container, NewLink, Body, Scroll, Graph, Links } from './styles';

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
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  const [links, setLinks] = useState([]);
  const [selectLink, setSelectLink] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getLinks() {
      const response = await api.get('/all/link', {
        params: page,
      });

      setLinks(response.data);
    }

    getLinks();
  }, [page]);

  const option = {
    color: ['#3398DB'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: labels,
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: 'clicks',
        type: 'bar',
        barWidth: '40%',
        data,
      },
    ],
  };

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

  async function handleLink(link) {
    const response = await api.get(`/${link.id}/accesses`);

    const { labels, data } = response.data;

    const labelsFormatted = labels.map(label =>
      format(parseISO(label), 'dd MMM')
    );
    setLabels(labelsFormatted);
    setData(data);
    setSelectLink(link);
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

      <Body>
        <Scroll>
          {links.map(link => (
            <Links key={link.id} type="button" onClick={() => handleLink(link)}>
              <h3>{link.title}</h3>
              <p>{link.url}</p>
            </Links>
          ))}
        </Scroll>
        {selectLink && (
          <Graph>
            <h2>{selectLink.title}</h2>
            <p>{selectLink.redirect_url}</p>

            <CopyToClipboard
              text={`sene.li/${selectLink.url}`}
              onCopy={() => {
                toast.success('URL copiado', {
                  position: toast.POSITION.TOP_RIGHT,
                });
              }}
            >
              <span>{`sene.li/${selectLink.url}`}</span>
            </CopyToClipboard>
            <ReactEcharts
              option={option}
              notMerge
              lazyUpdate
              style={{ height: '100%', width: '100%' }}
              theme="theme_name"
            />
          </Graph>
        )}
      </Body>
    </Container>
  );
}
