import React, { useState } from 'react';
import Login from './components/login';
import ImageGallery from './components/imageGallery';
import './App.css';

const App = () => {
  // Implement authentication logic
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogin = () => {
    setAuthenticated(true);
  };

  return (
    <div>
      <h1 className='header'>Image Gallery App</h1>
      {/* Implement authentication check */}
      {authenticated ? <ImageGallery /> : <Login onLogin={handleLogin} />}
    </div>
  );
};

export default App;

