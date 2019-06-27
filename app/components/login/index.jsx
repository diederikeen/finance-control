import React from 'react';
import { Link } from 'react-router-dom';

const LoginIndex = () => (
  <form>
    Hallo
    <Link to="/auth/google">Login with google</Link>
  </form>
);

export default LoginIndex;
