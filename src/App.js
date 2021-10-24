import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import axios from 'axios';

import Navigation from './components/Navigation';
import Arena from './pages/Arena';
import Favourite from './pages/Favourite';
import PokemonDetails from './pages/PokemonDetails';
import PokedexMainPage from './pages/PokedexMainPage';

const BASE_URL = `https://pokeapi.co/api/v2/pokemon/?limit=151`

function App() {

  const [pokemonDetails, setPokemonDetails] = useState(null)

  useEffect(() => {
    axios.get(`${BASE_URL}`)
      .then(response => {
        setPokemonDetails(response.data)
      })
      .catch(error => console.log(error))
  }, [])

  if (!pokemonDetails) {
    return (
      <Router>

        <Navigation />

        <Route
          path="/"
          exact>
          <PokedexMainPage />
        </Route>

        <Route path="/arena">
          <Arena />
        </Route>

        <Route path="/favourite">
          <Favourite />
        </Route>

      </Router>
    )
  } else if (pokemonDetails) {
    return (
      <Router>

        <Navigation />

        <Route
          path="/"
          exact>
          <PokedexMainPage />
        </Route>

        <Route path="/arena">
          <Arena />
        </Route>

        <Route path="/favourite">
          <Favourite />
        </Route>

        {
          Object.entries(pokemonDetails)[3] && Object.entries(pokemonDetails)[3][1]?.map((pokemon, index) => {
            return (
              <Route exact path={`/${pokemon.name}`}>
                <PokemonDetails key={index} {...pokemon} />
              </Route>
            );
          })
        }
      </Router>
    )
  };
}

export default App;
