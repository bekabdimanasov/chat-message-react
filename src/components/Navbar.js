import { AppBar, Button, Grid, Toolbar } from '@material-ui/core';

import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

import { LOGIN_ROUTE } from '../utils/consts';
import { Context } from '../index';

const Navbar = () => {
  const { auth } = useContext(Context);
  const [user] = useAuthState(auth);
  return (
    <AppBar color="secondary" position="static">
      <Toolbar variant="dense">
        <Grid container justify="flex-end">
          {user ? (
            <Button onClick={() => auth.signOut()} variant={'outlined'}>
              Выйти
            </Button>
          ) : (
            <NavLink to={LOGIN_ROUTE}>
              <Button variant={'outlined'}>Логин</Button>
            </NavLink>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
