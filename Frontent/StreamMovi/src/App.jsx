
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Layout from "./Fixlayout/layout";
 import { Login } from "./Login-Signup/login";
 import { Signup } from "./Login-Signup/SignUp";
import { Homepage } from './Pages/Home/Homepage'
import Detail from './Pages/Detail/Detail'
import Play from './Pages/PlayVideo/play'
import Search from './Nav_pages/Search'
import "./CSS/Homepage.css"
import { Table } from './Admin_Panel/Table';
import Account from './Nav_pages/Account';
import {UserProvider} from "./Helper/Helper-to-UseraccuntId";
import AdminSupport from './Admin_Panel/AdmiHelpSupp';

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/play/:id" element={<Play />} />
            <Route path="/Search" element={<Search />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/AdminPanel" element={<Table />} />
            <Route path="/Account" element={<Account />} />
            <Route path="/AdminHelpSupport" element={<AdminSupport />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;


