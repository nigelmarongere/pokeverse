import React from 'react';
import {useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';

function PokemonCard({ url, name }) {
  const [image, setImage] = useState('');
  const [abilities, setAbilities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      const data = await response.json();
      setImage(data.sprites.front_default);
      setAbilities(data.abilities);
    };
    fetchData();
  },[]);

  const listItems = abilities.map(obj => <li>{obj.ability.name}</li>);

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={image}/>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle>Abilities</Card.Subtitle>
        <Card.Text as="div"><ul>{listItems}</ul></Card.Text>
      </Card.Body>
    </Card>
  );
}

export { PokemonCard };
