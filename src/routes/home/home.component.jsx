import { Outlet } from 'react-router-dom';

import Directory from '../../components/diretory/directory.component'

const Home = () => {
  return (
    <div>
      <Directory />
      <Outlet />
    </div>
  );
};

export default Home;
