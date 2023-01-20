import { Route, Routes } from "react-router-dom";
import './App.scss';
import { Home, Catalog, FileNotFoundPage, Registerpage, Login, UsersList,User,EditUser,NewUserForm } from './pages'

function App() {
  return (
    <Routes>
      <Route path='/'>
        <Route index element={<h1>Store <br/>
          <a href='/admin'>admin</a><br/>
          <a href='/login'>Ienākt</a><br/>
          <a href='/register'>Registrēties</a></h1>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Registerpage/>}/>
      </Route>
      <Route path='/admin'>
        <Route index element={<Home/>}/>
        <Route path='catalog' element={<Catalog/>}/>
        <Route path='clients' element={<Catalog/>}/>
        <Route path='statistic' element={<Catalog/>}/>
        <Route path='user' element={<UsersList/>}/>
        <Route path='user/edit/:userid' element={<EditUser/>}/>
        <Route path='user/:userid' element={<User/>}/>
        <Route path='user/new' element={<NewUserForm/>}/>
        <Route path='setings' element={<Catalog/>}/>
      </Route>
      <Route path="*" element={<FileNotFoundPage/>}/>
    </Routes>
  );
}

export default App;
