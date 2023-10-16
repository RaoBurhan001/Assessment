import { Route, Routes } from 'react-router-dom';
import Login from '../modules/auth/components/Login';
import SignUp from '../modules/auth/components/Signup';
import UserList from '../modules/user/components/UsersList';
import EditUser from '../modules/user/components/EditUser';
//import Signup from './Signup';

const Routing = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/listing" element={<UserList />} />
      <Route path="/getuser/:id" element={<EditUser />} />
    </Routes>
  );
};

export default Routing;
