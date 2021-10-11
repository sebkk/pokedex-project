import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navigation from './components/Navigation';
import Arena from './pages/Arena';
import Favourite from './pages/Favourite';
import PokemonDetails from './pages/PokemonDetails';
import PokedexMainPage from './pages/PokedexMainPage';

function App() {

  const [mainPokemon, setMainPokemon] = useState({})

  return (
    <Router>

      <Navigation />

      <Route
        path="/"
        exact>
        <PokedexMainPage setMainPokemon={setMainPokemon} />
      </Route>

      <Route path="/arena">
        <Arena />
      </Route>

      <Route path="/favourite">
        <Favourite />
      </Route>

      {Object.entries(mainPokemon)[3] && Object.entries(mainPokemon)[3][1]?.map((pokemon, index) => {
        return (
          <Route exact path={`/${pokemon.name}`}>
            <PokemonDetails key={index} {...pokemon} />
          </Route>
        );
      })}
    </Router>
  );
}

export default App;
