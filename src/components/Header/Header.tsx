import { AppBar, ToggleButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import StyledToggleButtonGroup from "../ToggleButtonGroup/StyledToggleButtonGroup";

interface HeaderProps{
    tempUnit: string,
    handleTempUnitChange: (event: React.MouseEvent<HTMLElement>, newValue: string)=>void
}

export default function Header({tempUnit, handleTempUnitChange}: HeaderProps) {
    return (
        <AppBar position="static" color='transparent' sx={{ boxShadow: 'none' }}>
            <Toolbar>
                <Typography variant="h5" component="div" fontWeight={'500'} sx={{ flexGrow: 1 }}>
                    Weekly forecast
                </Typography>
                <StyledToggleButtonGroup
                    value={tempUnit}
                    exclusive
                    onChange={handleTempUnitChange}
                    aria-label="text alignment"

                >
                    <ToggleButton value="celsius" aria-label="left aligned" sx={{ borderRadius: 2 }}>
                        <Typography>℃</Typography>
                    </ToggleButton>
                    <ToggleButton value="fahrenheit" aria-label="centered" sx={{ borderRadius: 2 }}>
                        <Typography>℉</Typography>
                    </ToggleButton>
                </StyledToggleButtonGroup>
            </Toolbar>
        </AppBar>
    );
}