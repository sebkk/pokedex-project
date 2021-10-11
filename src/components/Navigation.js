import React from "react";
import styled from 'styled-components'
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import Logo from "../constans/Logo";
import FavoriteLogo from "../constans/FavoriteLogo";
import ArenaLogo from "../constans/ArenaLogo";

const Navi = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #D5A100;
    width: 100vw;
    height: 70px;
`;

const Icon = styled.div`
    margin-left: 15px;
`;

const NaviButtons = styled.div`
    margin-right: 20px;
    justify-content: space-evenly;
    font-size: 30px;

`;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        // marginRight: theme.spacing(5),
    },
}));

function ElevationScroll(props) {
    const { children } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        // target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,

    // window: PropTypes.func,
};

function Navigation({ ...props }) {
    const classes = useStyles();
    const history = useHistory()

    return (
        <div className={classes.root}>
            <ElevationScroll {...props}>
                <AppBar >
                    <Toolbar disableGutters='false' variant='dense'>
                        <Navi>
                            <Icon>
                                <IconButton onClick={() => history.push("/")} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                    <Logo />
                                </IconButton>
                            </Icon>
                            <NaviButtons>
                                <Button color="inherit" onClick={() => history.push("/favourite")}>
                                    <FavoriteLogo />
                                </Button>
                                <Button color="inherit" onClick={() => history.push("/arena")}>
                                    <ArenaLogo />
                                </Button>
                            </NaviButtons>
                        </Navi>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
        </div>
    )
}

export default Navigation