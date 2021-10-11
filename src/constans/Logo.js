import React from "react";
import styled from 'styled-components'

import PokedexLogo from "../pictures/PokedexLogo.png";

const Image = styled.img`
    height: 55px;
`

const Logo = () => {

    return (
        <Image
            src={PokedexLogo}
            alt='Pokedex'
        />
    )

}

export default Logo