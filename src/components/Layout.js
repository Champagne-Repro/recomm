import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { Box, Container, Divider, Stack } from "@mui/material";

export default function Layout({ onChangeTheme, theme }) {
    return (
        <Box >
            <Navbar onChangeTheme={onChangeTheme} theme={theme} />
            <Box sx={{ overflow: 'auto' }}>
                <Container
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        pt: { xs: 14, sm: 10 },
                        pb: { xs: 8, sm: 20 },
                    }}
                >
                    <Stack
                        spacing={2}
                        useFlexGap
                        sx={{ alignItems: 'center', width: { xs: '100%', sm: '70%' } }}
                    >
                        <Outlet />
                    </Stack>
                </Container>
            </Box>
            <Divider />
        </Box>
    )
}