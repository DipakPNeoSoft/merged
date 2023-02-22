import './App.css';
import Login from './components/Login';
import Post from './components/Post';
import Show from './components/Show';
import { BrowserRouter , Route,Switch } from 'react-router-dom';

function App() {
  return (
    
    <BrowserRouter>
    <Switch>
     <Route path="/posts/:id" component={Show} />

   
      <Route path="/posts" component={Post} />
      <Route path="/" component={Login} />
     
    </Switch>
    </BrowserRouter>
 
  );
}

export default App;
