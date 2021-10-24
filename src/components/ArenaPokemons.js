import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Button from '@mui/material/Button';

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
    width: 250px;
    min-height: 370px;
    height: auto;
    text-align: center;
    color: white;
    text-transform: capitalize;

`

const Image = styled.img`
    width: auto;
    max-width: 150px;
    min-height: 150px;
    position: relative;
`

const Species = styled.h3`
    margin: 5px 0;
    text-transform: uppercase;
`

const Line = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 20%;
    margin: 5px 0;
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
    cursor: 'pointer',
    textTransform: 'uppercase',
    position: 'relative',
    fontSize: 9,
    padding: '3px 0',
    right: '85px',
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
    },
    '&:active': {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
});

const ArenaPokemons = (pokemon) => {

    const handleDeletePokemon = () => {
        axios.delete(`http://localhost:3000/arena/${pokemon?.id}`)
            .then(response => console.log(response.data))
            .catch(error => console.log(error))

        window.location.reload()
    }

    return (
        <Card>
            <PageButton
                onClick={handleDeletePokemon}
                variant="contained">Usuń
            </PageButton>

            <Image
                src={pokemon?.sprite}
            />
            <Species>
                {pokemon?.species}
            </Species>
            <Line>
                <DetailsBlock>
                    <TextBlock>
                        {pokemon?.height}
                    </TextBlock>
                    <TextTitle>
                        Height
                    </TextTitle>
                </DetailsBlock>

                <DetailsBlock>
                    <TextBlock>
                        {pokemon?.baseExperience}
                    </TextBlock>
                    <TextTitle>
                        Base experience
                    </TextTitle>
                </DetailsBlock>
            </Line>

            <Line>
                <DetailsBlock>
                    <TextBlock>
                        {pokemon?.weight}
                    </TextBlock>
                    <TextTitle>
                        Weight
                    </TextTitle>
                </DetailsBlock>

                <DetailsBlock>
                    <TextBlock>
                        {pokemon?.ability}
                    </TextBlock>
                    <TextTitle>
                        Ability
                    </TextTitle>
                </DetailsBlock>
            </Line>
        </Card>
    )
}

export default ArenaPokemons