import './App.css';
import {Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import ChatPage from './pages/chatPage';

function App() {
  if(true){
    console.log=()=>{}
  }
  return (
    <div className="App">
      <Route path='/' component = {HomePage} exact/>
      <Route path='/chats' component = {ChatPage} exact/>
    </div>
  );
}

export default App;
