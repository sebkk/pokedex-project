import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import Button from '@mui/material/Button';
import axios from "axios";

import PokemonCard from "../components/PokemonCard";
import SearchInput from "../components/SearchInput";

const Container = styled.div`
    max-width: 100vw;
    min-height: 100vh;
    background-color: #3c5aa6;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 30px;
`

const List = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`

const Buttons = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
`

const PageButton = styled(Button)({
    boxShadow: '0 5px 20px rgba(0,0,0,0.35);',
    textTransform: 'uppercase',
    fontSize: 16,
    margin: '10px',
    padding: '14px 14px',
    border: '1px solid',
    borderRadius: '0 0',
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

const BASE_URL = `https://pokeapi.co/api/v2/pokemon/`

const PokedexMainPage = ({ setMainPokemon }) => {

    const [limitValue, setLimitValue] = useState(15)
    const [offsetValue, setOffsetValue] = useState(0)
    const [pokemons, setPokemons] = useState({})
    const [filter, setFilter] = useState('')

    useEffect(() => {
        axios.get(`${BASE_URL}?limit=${limitValue}&offset=${offsetValue}`)
            .then(response => {
                setPokemons(response.data)
                setMainPokemon(response.data)
            })
            .catch(error => console.log(error))
    }, [offsetValue])

    const prevPage = () => {
        if (offsetValue === 0) {
            alert('To pierwsza strona!')
            return
        }

        setOffsetValue(offsetValue - 16)
        setLimitValue(15)
    }

    const nextPage = () => {
        if (offsetValue === 144) {
            alert(`To ostatnia strona!`)
            return
        } else if (offsetValue === 128) {
            setLimitValue(7)
        }

        setOffsetValue(offsetValue + 16)
    }

    const firstPage = () => {
        setOffsetValue(0)
        setLimitValue(15)
    }

    return (
        <Container>
            <SearchInput setFilter={setFilter} />
            <Buttons>
                <PageButton
                    onClick={prevPage}
                    variant="contained">Poprzednia</PageButton>
                <PageButton
                    onClick={firstPage}
                    variant="contained">Pierwsza</PageButton>
                <PageButton
                    onClick={nextPage}
                    variant="contained">Następna</PageButton>
            </Buttons>
            <List>
                {Object.entries(pokemons)[3] && Object.entries(pokemons)[3][1].map((pokemon, index) => {
                    return (pokemon.name.includes(filter) && <PokemonCard key={index} {...pokemon} />)
                })}
            </List>
        </Container>
    )

}

export default PokedexMainPage