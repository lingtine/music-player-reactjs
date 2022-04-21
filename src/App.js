
import './App.css';
import {Dashboard,Playlist} from './components/javascrpit'



function App() {
  
  return (
    
    <div className="App">
      <div className='player'> 
        <Dashboard/>
        <Playlist/>
      </div>  
    </div>
   
  );
}

export default App;
