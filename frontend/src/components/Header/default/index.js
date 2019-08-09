import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { signOut } from '~/store/modules/auth/actions';

import { Container, Content, Profile } from '../styles';

export default function Header() {
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

  return (
    <Container>
      <Content>
        <nav>
          <Link to="/">DASHBOARD</Link>
        </nav>

        <aside>
          <Profile>
            <div>
              <div>
                <strong>{profile.name}</strong>
                <Link to="/profile">Meu perfil</Link>
              </div>
            </div>

            <button type="button" onClick={() => dispatch(signOut())}>
              <Link to="/">Sair</Link>
            </button>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
