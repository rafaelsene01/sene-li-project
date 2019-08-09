import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import { signInSuccess, signFailure } from './actions';

export function* singIn({ payload }) {
  const { email, password } = payload;
  try {
    const response = yield call(api.post, 'new/sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));

    history.push('./dashboard');
  } catch (error) {
    toast.error('Falha na autencicacao verifique seus dados');
    yield put(signFailure());
  }
}

export function* singUp({ payload }) {
  try {
    const { name, email, password } = payload;
    yield call(api.post, 'new/users', {
      name,
      email,
      password,
    });
    toast.success('Conta criada!');
    history.push('/');
  } catch (error) {
    toast.error('Falha no cadastro, verifique seus dados!');

    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  api.defaults.headers.Authorization = `Bearer ${token}`;
}

export function singOut() {
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', singIn),
  takeLatest('@auth/SIGN_UP_REQUEST', singUp),
  takeLatest('@auth/SIGN_OUT', singOut),
]);
