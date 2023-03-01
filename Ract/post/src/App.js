import './App.css';
import { createContext, useState } from "react";
import Login from './components/Login';
import Post from './components/Post';
import Show from './components/Show';
import New from './components/New';
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Edit from './components/Edit';
import Registration from './components/Registration';
import Navabar from './components/Navabar';
import Sidebar from './components/Sidebar';
import Account from './components/Account';
import UserPost from './components/UserPost';


export const UserContext = createContext(null);


function App() {
  const [userId, setUserId] = useState(null);

  return (


    
    <UserContext.Provider value={{ userId, setUserId }}>
      <BrowserRouter> 
        <Navabar/>
        <Routes>
          <Route path="/new" element={<New/>} />
          <Route path="/sidebar" element={<Sidebar/>} />
          <Route path="/account/:id" element={<Account/>} />
          <Route path="/user/:id/posts" element={<UserPost/>} />

          <Route path="/posts/:id" element={<Show/>} />
          <Route exac path="/posts/:id/edit" element={<Edit/>} />

          <Route path="/register" element={<Registration/>} />

          <Route path="/posts" element={<Post/>} />
          <Route path="/" element={<Login/>} />

        </Routes>
      
      
      </BrowserRouter>
    </UserContext.Provider>

    
    
      
   
    
 
  );
}

export default App;
