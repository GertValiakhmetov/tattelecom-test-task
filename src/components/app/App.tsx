import React, { useContext, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Header from '../header/Header';
import Albums from '../Albums/Albums';
import Users from '../Users/Users';
import Posts from '../Posts/Posts';
import Main from '../Main/Main';
import ServiceContext from '../../contexts/serviceContext';
import AlbumOverview from '../AlbumOverview/AlbumOverview';

export type UsersState = {
    address: {
        city: string,
        get: {
            lat: string,
            lng: string,
        },
        street: string,
        suite: string,
        zipcode: string
    },
    company: {
        bs: string,
        catchPhrase: string,
        name: string,
    },
    email: string,
    id: number,
    name: string,
    phone: string,
    username: string,
    website: string
}

const App = () => {
  const { service } = useContext(ServiceContext);
  const [users, setUsers] = useState<Array<UsersState>>([]);

  useEffect(() => {
    (async () => {
      const fetchedUsers = await service.getUsers();
      setUsers(fetchedUsers);
    })();
  }, []);

  return (
    <Router>
      <Header />
      <Main>
        <Switch>
          <Route path="/" exact>
            <Users users={users} />
          </Route>
          <Route path="/posts" exact>
            <Posts users={users} />
          </Route>
          <Route path="/albums" exact>
            <Albums />
          </Route>
          <Route path="/albums/:id">
            <AlbumOverview />
          </Route>
          <Route render={() => <h1>Page not found</h1>} />
        </Switch>
      </Main>
    </Router>
  );
};

export default App;
