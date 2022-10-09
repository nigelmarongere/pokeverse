import React from 'react';
import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { PokemonCard } from './components/PokemonCard';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { FormControl } from 'react-bootstrap';
import { Box, Container } from '@mui/material';

const LIMIT = 150;
const pokeApi = `https://pokeapi.co/api/v2/pokemon/?limit=${LIMIT}`;

function App() {
  // initialize state
  const [pokemonRaw, setPokemonRaw] = useState([]);
  const [pokemonFiltered, setPokemonFiltered] = useState([]);

  // fetch data
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(pokeApi);
      const data = await response.json();
      setPokemonRaw(data.results);
      setPokemonFiltered(data.results);
    };
    fetchData();
  },[]);

  const handleChange = (ev) => {
    // get input value
    const value = ev.target.value;
    // regex to match input value
    const regex = new RegExp(value, 'gi');
    // filter matches from pokemonRaw
    const filtered = pokemonRaw.filter((pokemon) => {
      return pokemon.name.match(regex);
    });
    // set pokemonFiltered to matches
    setPokemonFiltered(filtered);
  }

  return (
    <div data-testid="app">
      <Navigation />
      <Box display="flex" p={3}>
        <InputGroup>
          <InputGroup.Text>Search</InputGroup.Text>
          <FormControl placeholder="name" onChange={handleChange}/>
        </InputGroup>
      </Box>
      <Container sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {pokemonFiltered.map(pokemon => <PokemonCard key={pokemon.name} url={pokemon.url} name={pokemon.name}/>)}
      </Container>
    </div>
  );
}

export { App };
