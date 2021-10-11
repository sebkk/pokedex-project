import React from 'react';
import styled from 'styled-components';
import { useHistory } from "react-router";

const Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    margin: 15px 15px;
    box-sizing: border-box;
    padding: 8px;
    background-color: rgba(0, 0, 0, 0.2);
    box-shadow: 0 5px 20px rgba(0,0,0,0.35);
    transition: transform 200ms;
    width: 250px;
    height: 300px;
    text-align: center;
    color: white;
    text-transform: capitalize;

    :hover {
        transform: scale(1.1);
        box-shadow: 0 10px 30px rgba(0,0,0,.35);
    }
`

const Image = styled.img`
    width: auto;
    max-width: 150px;
    min-height: 150px;
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

const FavoritePokemonCard = (pokemon) => {

    let history = useHistory();

    const handleClick = () => {
        history.push(`/${pokemon.species}`)
    }

    return (
        <Card onClick={handleClick}>
            <Image
                src={pokemon.sprite}
            />
            <Species>
                {pokemon.species}
            </Species>
            <Line>
                <DetailsBlock>
                    <TextBlock>
                        {pokemon.height}
                    </TextBlock>
                    <TextTitle>
                        Height
                    </TextTitle>
                </DetailsBlock>

                <DetailsBlock>
                    <TextBlock>
                        {pokemon.baseExperience}
                    </TextBlock>
                    <TextTitle>
                        Base experience
                    </TextTitle>
                </DetailsBlock>
            </Line>

            <Line>
                <DetailsBlock>
                    <TextBlock>
                        {pokemon.weight}
                    </TextBlock>
                    <TextTitle>
                        Weight
                    </TextTitle>
                </DetailsBlock>

                <DetailsBlock>
                    <TextBlock>
                        {pokemon.ability}
                    </TextBlock>
                    <TextTitle>
                        Ability
                    </TextTitle>
                </DetailsBlock>
            </Line>
        </Card>
    )
}

export default FavoritePokemonCard