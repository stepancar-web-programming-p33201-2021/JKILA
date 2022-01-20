/* eslint-disable */
import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { Spinner } from 'react-bootstrap';
import {check, registrationAdmin} from './http/userAPI';
import { Context } from './index';

import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';

const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    check().then((data) => {
      user.setUser(data);
      user.setIsAuth(true);
    }).finally(() => setLoading(false))
      .catch(err => console.log(1));
  }, []);

  /*(async () => {
    await registrationAdmin('admin', 'admin','admin', 'admin',)
  })();*/

  if (loading) {
    return <Spinner animation="grow" />;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
