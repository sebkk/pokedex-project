import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import axios from "axios";
import Button from '@mui/material/Button';
import { useHistory } from "react-router";

import ArenaPokemons from "../components/ArenaPokemons";

const Container = styled.div`
    max-width: 100vw;
    min-height: 100vh;
    background-color: #3c5aa6;
    box-sizing: border-box;
    padding-top: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`

const Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin: 15px 80px;
    box-sizing: border-box;
    padding: 8px;
    background-color: rgba(0, 0, 0, 0.2);
    box-shadow: 0 5px 20px rgba(0,0,0,0.35);
    transition: transform 200ms;
    width: 250px;
    min-height: 370px;
    height: auto;
    text-align: center;
    color: white;
    text-transform: capitalize;

    :hover {
        transform: scale(1.1);
        box-shadow: 0 10px 30px rgba(0,0,0,.35);
    }
`

const List = styled.div`
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    min-width: 60vw;
    max-width: 100vw;

    :first-child {
        opacity: ${({ winner }) => (winner === 1 ? 0.5 : 1.0)};
    };

    :nth-child(2) {
        opacity: ${({ winner }) => (winner === 2 ? 0.5 : 1.0)};
    }
`

const ArenaContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const FightButton = styled(Button)({
    boxShadow: '0 5px 20px rgba(0,0,0,0.35);',
    textTransform: 'uppercase',
    fontSize: 18,
    padding: '10px 10px',
    margin: '15px',
    borderRadius: '0 0',
    width: '150px',
    lineHeight: 1.5,
    backgroundColor: '#d5a100',
    borderColor: '#d5a100',
    fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
        backgroundColor: '#d5a100',
        borderColor: '#d5a100',
        boxShadow: '0 5px 15px rgba(0,0,0,0.8);',
    },
    '&:active': {
        boxShadow: '0 5px 20px rgba(0,0,0,0.8);',
        backgroundColor: '#d5a100',
        borderColor: '#d5a100',
    },
});

const PageButton = styled(Button)({
    boxShadow: '0 5px 20px rgba(0,0,0,0.35);',
    textTransform: 'uppercase',
    fontSize: 16,
    padding: '10px 10px',
    margin: '15px',
    borderRadius: '0 0',
    width: '150px',
    lineHeight: 1.5,
    backgroundColor: '#d5a100',
    borderColor: '#d5a100',
    fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
        backgroundColor: '#d5a100',
        borderColor: '#d5a100',
        boxShadow: '0 5px 15px rgba(0,0,0,0.8);',
    },
    '&:active': {
        boxShadow: '0 5px 20px rgba(0,0,0,0.8);',
        backgroundColor: '#d5a100',
        borderColor: '#d5a100',
    },
});

const Arena = () => {

    const [pokemonData, setPokemonData] = useState(null)
    const [flag, setFlag] = useState(false)
    const [winner, setWinner] = useState(0)

    let history = useHistory();

    useEffect(() => {
        axios.get('http://localhost:3000/arena')
            .then(response => setPokemonData(response.data))
            .catch(error => console.log(error))
    }, [])

    const handleEndBattle = () => {
        axios.delete(`http://localhost:3000/arena/${pokemonData?.[0]?.id}`)
            .then(response => console.log(response.data))
            .catch(error => console.log(error))
        axios.delete(`http://localhost:3000/arena/${pokemonData?.[1]?.id}`)
            .then(response => console.log(response.data))
            .catch(error => console.log(error))

        history.push(`/`)
    }

    const handleFight = () => {

        const firstPokemonName = pokemonData?.[0]?.species
        const secondPokemonName = pokemonData?.[1]?.species

        const firstPNCapitalize = firstPokemonName.charAt(0).toUpperCase() + firstPokemonName.slice(1)
        const secondPNCapitalize = secondPokemonName.charAt(0).toUpperCase() + secondPokemonName.slice(1)

        const firstPokemonWeight = pokemonData?.[0]?.weight
        const secondPokemonWeight = pokemonData?.[1]?.weight

        const firstPokemonBE = pokemonData?.[0]?.baseExperience
        const secondPokemonBE = pokemonData?.[1]?.baseExperience

        const firstPokemonPowerCount = firstPokemonWeight * firstPokemonBE
        const secondPokemonPowerCount = secondPokemonWeight * secondPokemonBE

        if (firstPokemonPowerCount > secondPokemonPowerCount) {
            setWinner(1)
            alert(`Wygrał ${firstPNCapitalize}!`)
        } else if (firstPokemonPowerCount < secondPokemonPowerCount) {
            setWinner(2)
            alert(`Wygrał ${secondPNCapitalize}!`)
        } else {
            alert('Remis!')
        }

        setFlag(true)
    }

    if (flag === true) {
        return (
            <Container>
                <ArenaContainer>
                    <PageButton
                        variant='contained'
                        onClick={handleEndBattle}
                    >
                        Opuść arenę!
                    </PageButton>
                </ArenaContainer>

                <List>
                    {pokemonData?.map((pokemon, index) => {
                        return (<ArenaPokemons key={index} {...pokemon} />)
                    })}
                </List>
            </Container>
        )
    } else if (pokemonData?.length === 0) {
        return (
            <Container>

                <ArenaContainer>
                    <FightButton
                        onClick={handleFight}
                        variant="contained"
                        disabled={pokemonData?.length === 2 ? false : true}
                    >
                        Walcz!
                    </FightButton>
                </ArenaContainer>

                <List>
                    <Card></Card>
                    <Card></Card>
                </List>

            </Container>)
    } else if (pokemonData?.length === 1) {
        return (
            <Container>

                <ArenaContainer>
                    <FightButton
                        onClick={handleFight}
                        variant="contained"
                        disabled={pokemonData?.length === 2 ? false : true}
                    >
                        Walcz!
                    </FightButton>
                </ArenaContainer>

                <List winner={winner}>
                    {pokemonData?.map((pokemon, index) => {
                        return (<ArenaPokemons key={index} {...pokemon} />)
                    })}
                    <Card></Card>
                </List>

            </Container>)
    } else {
        return (
            <Container>

                <ArenaContainer>
                    <FightButton
                        onClick={handleFight}
                        variant="contained"
                        disabled={pokemonData?.length === 2 ? false : true}
                    >
                        Walcz!
                    </FightButton>
                </ArenaContainer>

                <List children={ArenaPokemons}>
                    {pokemonData?.map((pokemon, index) => {
                        return (<ArenaPokemons key={index} {...pokemon} />)
                    })}
                </List>

            </Container >
        )
    }
}

export default Arena