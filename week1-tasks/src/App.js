import './App.css';
import Calc from './components/Calc';
import Header from './components/Header';
import Memory from './components/Memory';
import { AuthContextProvider } from './context/AuthContext';
function App() {
  return (
    <div className="App">
      <AuthContextProvider>
      <div className='header'>
        <Header />
        
      </div>
      <div className='home'>
        <div className='item'><Calc /></div>
        <div className='item'><Memory /></div>
      </div>
      </AuthContextProvider>
    </div>
  );
}

export default App;
