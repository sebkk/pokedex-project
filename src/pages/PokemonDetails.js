import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import axios from "axios";
import { useHistory } from "react-router";
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddIcon from '@mui/icons-material/Add';

const Container = styled.div`
    max-width: 100vw;
    height: 100vh;
    padding-top: 20px;
    background-color: #3c5aa6;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const Card = styled.div`
    min-width: 10%;
    display: flex;
    flex-direction: row;
    align-items: center;
    box-sizing: border-box;
    padding: 20px 15px;
    background-color: rgba(0, 0, 0, 0.2);
    box-shadow: 0 5px 20px rgba(0,0,0,0.35);
    text-align: center;
    color: white;
    text-transform: capitalize;
`

const Image = styled.img`
    max-width: 50%;
    margin: 20px 30px;
`

const DetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 80%;
    width: 50%;
`

const Species = styled.h3`
    font-size: 23px;
    margin-bottom: 35px;
    height: 40%;
    text-transform: uppercase;
    display: flex;
    justify-content: center;
    align-items: baseline;
`

const Icons = styled.div`
    margin-left: 8px;
`


const Line = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 25%;
    margin: 10px 0;
`

const DetailsBlock = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`

const TextBlock = styled.div`
    width: 100%;
    text-align: center;
    box-sizing: border-box;
    font-size: 12px;
`

const TextTitle = styled.div`
    display: flex;
    box-sizing: border-box;
    text-align: center;
    padding: 0 2px;
    font-weight: bold;
    font-size: 13px;
    text-transform: uppercase;
`

const PageButton = styled(Button)({
    textTransform: 'uppercase',
    fontSize: 16,
    marginTop: '20px',
    padding: '14px 14px',
    border: '1px solid',
    borderRadius: '0 0',
    lineHeight: 1.5,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderColor: 'rgba(0, 0, 0, 0.1)',
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
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        boxShadow: '0 5px 15px rgba(0,0,0,0.4);',
    },
    '&:active': {
        boxShadow: '0 5px 20px rgba(0,0,0,0.8);',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
});

const PokemonDetails = (pokemon) => {

    const [pokemonData, setPokemonData] = useState([])
    const [flag, setFlag] = useState(false)
    const [pokemonFavorites, setPokemonFavorites] = useState(null)
    const [pokemonArena, setPokemonArena] = useState(null)
    const [arenaFlag, setArenaFlag] = useState(false)

    let history = useHistory();

    const handleClick = () => {
        history.push(`/`)
    }

    useEffect(() => {
        axios.get(pokemon.url)
            .then(response => setPokemonData(response.data))
            .catch(error => console.log(error))
    }, [pokemon])

    useEffect(() => {
        axios.get('http://localhost:3000/favorites')
            .then(response => setPokemonFavorites(response?.data?.map(p => p.id)))
            .catch(error => console.log(error))
        axios.get('http://localhost:3000/arena')
            .then(response => setPokemonArena(response.data))
            .catch(error => console.log(error))
    }, [])

    useEffect(() => {
        const pokemonFavoritesFlag = pokemonFavorites?.includes(pokemonData?.id)

        if (pokemonFavoritesFlag === true) {
            setFlag(true)
        } else if (pokemonFavoritesFlag === false) {
            setFlag(false)
        }
    }, [pokemonFavorites])

    const pokemonArenaId = pokemonArena?.map((pokemon) => pokemon.id)

    useEffect(() => {

        const pokemonArenaFlag = pokemonArenaId?.includes(pokemonData?.id)

        if (pokemonArenaFlag === true) {
            setArenaFlag(true)
        } else if (pokemonArenaFlag === false) {
            setArenaFlag(false)
        }
    }, [pokemonArena])

    const handleAddFavorite = () => {

        if (flag === false) {
            axios.post(('http://localhost:3000/favorites'), {
                sprite: pokemonData.sprites.other.dream_world.front_default,
                species: pokemonData.name,
                height: pokemonData.height,
                weight: pokemonData.weight,
                baseExperience: pokemonData.base_experience,
                ability: pokemonData.abilities[0].ability.name,
                id: pokemonData.id
            })

            setFlag(true)
        } else if (flag === true) {
            axios.delete(`http://localhost:3000/favorites/${pokemonData.id}`)
                .then(response => console.log(response.data))

            setFlag(false)
        }
    }

    const handleAddArena = () => {

        if (pokemonArena?.length === 2 || pokemonArena?.length > 2) {
            alert('Na arenie są już dwa Pokemony!')
        } else if (arenaFlag === false) {
            axios.post(('http://localhost:3000/arena'), {
                sprite: pokemonData.sprites.other.dream_world.front_default,
                species: pokemonData.name,
                height: pokemonData.height,
                weight: pokemonData.weight,
                baseExperience: pokemonData.base_experience,
                ability: pokemonData.abilities[0].ability.name,
                id: pokemonData.id
            })

            setArenaFlag(true)
        } else if (arenaFlag === true) {
            alert('Pokemon jest już na arenie!')
        }
    }

    return (
        <Container>
            <Card>
                <Image
                    src={pokemonData?.sprites?.other.dream_world?.front_default}
                />

                <DetailsContainer>
                    <Species>

                        {pokemonData?.name}
                        <Icons>
                            <FavoriteIcon
                                style={{ cursor: 'pointer' }}
                                color={flag === false ? 'inherit' : 'error'}
                                fontSize='small'
                                onClick={handleAddFavorite}
                            />

                            <AddIcon
                                style={{ cursor: 'pointer' }}
                                color={arenaFlag === false ? 'inherit' : 'success'}
                                onClick={handleAddArena}
                                fontSize='medium'
                            />
                        </Icons>
                    </Species>



                    <Line>
                        <DetailsBlock>
                            <TextBlock>
                                {pokemonData?.height}
                            </TextBlock>
                            <TextTitle>
                                Height
                            </TextTitle>
                        </DetailsBlock>

                        <DetailsBlock>
                            <TextBlock>
                                {pokemonData?.base_experience}
                            </TextBlock>
                            <TextTitle>
                                Base experience
                            </TextTitle>
                        </DetailsBlock>
                    </Line>

                    <Line>
                        <DetailsBlock>
                            <TextBlock>
                                {pokemonData?.weight}
                            </TextBlock>
                            <TextTitle>
                                Weight
                            </TextTitle>
                        </DetailsBlock>

                        <DetailsBlock>
                            <TextBlock>
                                {pokemonData?.abilities?.[0]?.ability?.name}
                            </TextBlock>
                            <TextTitle>
                                Ability
                            </TextTitle>
                        </DetailsBlock>
                    </Line>
                    <PageButton
                        onClick={handleClick}
                        variant="contained">Strona Główna
                    </PageButton>
                </DetailsContainer>
            </Card>

        </Container>
    )
}

export default PokemonDetails