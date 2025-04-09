import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import ThemeSwitchButton from './ThemeSwitchButton';
import { ButtonGroup } from '@mui/material';
import { NavLink } from "react-router-dom";
import routes from '../routes/routes';
import Avatar from '@mui/material/Avatar';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
    backdropFilter: 'blur(24px)',
    border: '1px solid',
    borderColor: (theme.vars || theme).palette.divider,
    backgroundColor: theme.vars
        ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
        : alpha(theme.palette.background.default, 0.4),
    boxShadow: (theme.vars || theme).shadows[1],
    padding: '8px 12px',
}));

export default function Navbar({ onChangeTheme, theme }) {
    return (
        <AppBar
            position="fixed"
            enableColorOnDark
            sx={{
                boxShadow: 0,
                bgcolor: 'transparent',
                backgroundImage: 'none',
                mt: 'calc(var(--template-frame-height, 0px) + 28px)',
            }}
        >
            <Container maxWidth="lg">
                <StyledToolbar variant="dense" disableGutters>
                    <Avatar
                        src={require('../assets/r_logo.png')}
                        alt="Logo"
                        sx={{
                            width: 40,
                            height: 40,
                            mr: 2,
                            cursor: 'pointer'
                        }}
                        component={NavLink}
                        to={routes.HOME}
                    />
                    <ButtonGroup>
                        <Button component={NavLink}
                            to={routes.HOME}
                            isActive={(location) => location.pathname === routes.HOME}
                            sx={{
                                '&.active': {
                                    bgcolor: theme ? 'primary.dark' : 'primary.light',
                                    color: 'white'
                                }
                            }}
                        >
                            Accueil
                        </Button>

                        <Button component={NavLink}
                            to={routes.SWITCH}
                            isActive={(location) => location.pathname === routes.SWITCH}
                            sx={{
                                '&.active': {
                                    bgcolor: theme ? 'primary.dark' : 'primary.light',
                                    color: 'white'
                                }
                            }}
                        >
                            Switch
                        </Button>

                        <Button component={NavLink}
                            to={routes.ONDULEUR}
                            isActive={(location) => location.pathname === routes.ONDULEUR}
                            sx={{
                                '&.active': {
                                    bgcolor: theme ? 'primary.dark' : 'primary.light',
                                    color: 'white'
                                }
                            }}
                        >
                            Onduleur
                        </Button>

                        <Button component={NavLink}
                            to={routes.ECRAN}
                            isActive={(location) => location.pathname === routes.ECRAN}
                            sx={{
                                '&.active': {
                                    bgcolor: theme ? 'primary.dark' : 'primary.light',
                                    color: 'white'
                                }
                            }}
                        >
                            ÉCRAN
                        </Button>

                        <Button component={NavLink}
                            to={routes.CLAVIER}
                            isActive={(location) => location.pathname === routes.CLAVIER}
                            sx={{
                                '&.active': {
                                    bgcolor: theme ? 'primary.dark' : 'primary.light',
                                    color: 'white'
                                }
                            }}
                        >
                            Clavier
                        </Button>

                        <Button component={NavLink}
                            to={routes.SOURIS}
                            isActive={(location) => location.pathname === routes.SOURIS}
                            sx={{
                                '&.active': {
                                    bgcolor: theme ? 'primary.dark' : 'primary.light',
                                    color: 'white'
                                }
                            }}
                        >
                            Souris
                        </Button>
                    </ButtonGroup>
                    <ThemeSwitchButton onChangeTheme={onChangeTheme} theme={theme} />
                </StyledToolbar>
            </Container>
        </AppBar>
    );
}