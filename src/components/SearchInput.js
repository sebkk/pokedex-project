import React from 'react';
import styled from 'styled-components'

import TextField from '@mui/material/TextField';

const Container = styled.div`
    padding-top: 90px;
    padding-bottom: 10px;
    box-sizing: border-box;
`

const SearchInput = ({ setFilter }) => {

    const handleSearchChange = (e) => {
        setFilter(e.target.value)
    }

    return (
        <Container>
            <TextField onChange={handleSearchChange} placeholder='Wyszukaj' variant="filled" />
        </Container>
    )
}

export default SearchInput