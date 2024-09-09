import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PokemonList from './pages/List';
import PokemonDetails from './pages/Details';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/pokemon/:id" element={<PokemonDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
