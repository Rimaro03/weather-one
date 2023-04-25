import { LocationSearching, Search } from "@mui/icons-material";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { currentweather } from '@/interfaces/weather' 
import React from "react";
import Image from "next/image";

interface SideMenuProps{
    currentWeather: currentweather;
}

export default function SideMenu({currentWeather}: SideMenuProps) {
    return (
        <Box width={'30%'} sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', margin: 'auto' }}>
                <TextField
                    placeholder='Search for a place...'
                    size="small"
                    variant='outlined'
                    InputProps={{
                        startAdornment:
                            <InputAdornment position='start'>
                                <Search />
                            </InputAdornment>,
                        endAdornment:
                            <InputAdornment position='start'>
                                <IconButton
                                    aria-label="toggle password visibility"
                                    edge="end"
                                >
                                    <LocationSearching />
                                </IconButton>
                            </InputAdornment>
                    }}
                />
                <Image src={`https:${currentWeather.current.condition.icon}`} height={64} width={64} alt={'Current weather image'} />
            </Box>
        </Box>
    );
}