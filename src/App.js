import './App.css';
import Signup from './components/SignUP';
import Login from './components/Login';
import Feed from './components/Feed';
// import Fireauth from './components/Fireauth';
// import './components/fontawesome'
import { AuthProvider } from './context/AuthContext';

import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className='page'>

      <BrowserRouter>
        <AuthProvider>

          <Routes>
            <Route path='/' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/feed' element={<Feed/>}  />


          </Routes>
        </AuthProvider>
      </BrowserRouter>
      {/* <Fireauth/> */}
    </div>
  );
}

export default App;
