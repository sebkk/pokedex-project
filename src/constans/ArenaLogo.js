import React from "react";
import styled from 'styled-components'

import ArenaLogoPhoto from "../pictures/ArenaLogo.png";

const Image = styled.img`
`

const ArenaLogo = () => {

    return (
        <Image
            src={ArenaLogoPhoto}
            alt='Arena'
        />
    )

}

export default ArenaLogo