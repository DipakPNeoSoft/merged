import './App.css';
import Login from './components/Login';
import Post from './components/Post';
import Show from './components/Show';
import New from './components/New';
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Edit from './components/Edit';
import Registration from './components/Registration';
import Navabar from './components/Navabar';

function App() {
  return (
    

    <BrowserRouter> 
      <Navabar/>

      <Routes>
        <Route path="/new" element={<New/>} />

        <Route path="/posts/:id" element={<Show/>} />
        <Route exac path="/posts/:id/edit" element={<Edit/>} />

        <Route path="/register" element={<Registration/>} />

        <Route path="/posts" element={<Post/>} />
        <Route path="/" element={<Login/>} />

      </Routes>
     
     
    </BrowserRouter>
    
    
      
   
    
 
  );
}

export default App;
