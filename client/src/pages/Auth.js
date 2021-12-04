/* eslint-disable */
import React, { useContext, useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import {BOARD, LOGIN_ROUTE, REGISTRATION_ROUTE, WORKSPACES} from '../utils/consts';
import { login, registration } from '../http/userAPI';
import { Context } from '../index';

const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const history = useHistory();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [fName, setfName] = useState('');
  const [lName, setlName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const click = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(username, password);
      } else {
        console.log(username, fName, lName, password);
        data = await registration(username, fName, lName, password);
      }
      user.setUser(user);
      user.setIsAuth(true);
      history.push(WORKSPACES);
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">{isLogin ? 'Вход' : 'Регистрация'}</h2>
        <Form className="d-flex flex-column">
          {isLogin ? (
                  <div>
                    <Form.Control className="mt-3" placeholder="Введите username..." value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <Form.Control className="mt-3" placeholder="Введите пароль..." value={password} onChange={(e) => setPassword(e.target.value)} type="password"/>

                  </div>
              )
              : (
                  <div>
                    <Form.Control className="mt-3" placeholder="Введите username..." value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <Form.Control className="mt-3" placeholder="Введите имя..." value={fName} onChange={(e) => setfName(e.target.value)}/>
                    <Form.Control className="mt-3" placeholder="Введите фамилию..." value={lName} onChange={(e) => setlName(e.target.value)}/>
                    <Form.Control className="mt-3" placeholder="Введите пароль..." value={password} onChange={(e) => setPassword(e.target.value)} type="password"/>
                  </div>
              )}

          <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
            {isLogin ? (
                <div> Нет аккаунта? {' '}
                  <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
                </div>
              )
              : (
                <div> Есть аккаунт? {' '}
                  <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                </div>

              )}
            <Button variant="outline-success" onClick={click}>
              {isLogin ? 'Войти' : 'Регистрация'}
            </Button>
          </Row>

        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
