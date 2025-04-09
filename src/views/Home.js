import React from 'react';
import { Box, Card, CardContent, Divider, Typography } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import { Link } from 'react-router-dom';
import CardActionArea from '@mui/material/CardActionArea';
import routes from '../routes/routes';
import Grow from '@mui/material/Grow';


export default function Home() {
    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src={require('../assets/logo_recomm.gif')} alt="Logo" style={{ maxWidth: '80%', height: 'auto' }} />
            </Box>

            <Divider />

            <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center', width: '100%', flexWrap: 'wrap', gap: 2 }}>

                {Object.entries(routes).slice(2).map((route, index) => (
                    <Grow in={true} timeout={1000} key={index}>
                        <Link to={route[1]} style={{ textDecoration: 'none' }}>
                            <Card variant="outlined">
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height={300}
                                        image={require(`../assets${route[1]}.png`)}
                                        alt={`${route} image`}
                                    />
                                    <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <Typography variant="h6">
                                            {route[0]}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Link>
                    </Grow>
                ))}
            </Box>
        </>
    );
}