import React from "react";
import styled from 'styled-components'

import FavoriteLogoPhoto from "../pictures/FavoriteLogo.png";

const Image = styled.img`
`

const FavoriteLogo = () => {

    return (
        <Image
            src={FavoriteLogoPhoto}
            alt='Ulubione'
        />
    )

}

export default FavoriteLogo