import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import FavoritePokemonCard from '../components/FavoritePokemonCard';

const Container = styled.div`
    max-width: 100vw;
    min-height: 100vh;
    padding-top: 80px;
    background-color: #3c5aa6;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`

const List = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`

const Info = styled.h1`
    color: white;
    text-transform: uppercase;
`

const Favourite = () => {

    const [pokemonData, setPokemonData] = useState(null)

    useEffect(() => {
        axios.get('http://localhost:3000/favorites')
            .then(response => setPokemonData(response.data))
            .catch(error => console.log(error))
    }, [])

    if (pokemonData?.length === 0) {
        return (
            <Container>
                <List>
                    <Info>
                        Brak Pokemonów w ulubionych!
                    </Info>
                </List>
            </Container>
        )
    } else {
        return (
            <Container>
                <List>
                    {pokemonData?.map((pokemon, index) => {
                        return (< FavoritePokemonCard key={index} {...pokemon} />)
                    })}
                </List>
            </Container>
        )
    }
}

export default Favourite