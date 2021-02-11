import React from 'react';
import { Link } from 'react-router-dom';
import './header.scss';

const Header = () => (
  <header>
    <nav>
      <Link to="/">users</Link>
      <Link to="/posts">posts</Link>
      <Link to="/albums">albums</Link>
    </nav>
  </header>
);

export default Header;
