import React, { ChangeEvent, FormEvent, useState } from 'react'
import { AppBar, Box, Container, Icon, IconButton, Input, InputAdornment, OutlinedInput, TextField, Toolbar, Typography } from '@mui/material'
import { LocationSearching, Send } from '@mui/icons-material';
import Image from 'next/image';
import Logo from '../../public/logo.svg';
import { useRouter } from 'next/router';
import Snack from '@/components/Snack/Snack';

export default function Place() {
    const [place, setPlace] = useState('');
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const inputChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setPlace(e.target.value);
    };

    const openAlert = () => {
        setOpen(true);
    }

    const handleSubmit = () => {
        if(place.length > 0){
            router.push({
                pathname: '/',
                query: {place: place}
            })
        }
        else{
            openAlert();
        }
    }

    return (
        <Container>
            <AppBar position='static' color='transparent' sx={{ boxShadow: 'none' }}>
                <Toolbar variant='dense'>
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <Image src={Logo} alt='logo' width={50} height={50} />
                    </IconButton>
                    <Typography variant="h5" color="inherit" component="div">
                        Weather One
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
                <Box sx={{ margin: '10px', backgroundColor: '#f0f0f0', borderRadius: 5 }}>
                    <Box sx={{ margin: 7 }}>
                        <Typography variant='h5'>Select a location</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                            <OutlinedInput
                                onChange={inputChange}
                                startAdornment={
                                    <InputAdornment position='start'>
                                        <LocationSearching />
                                    </InputAdornment>
                                }
                                endAdornment={
                                    <InputAdornment position='start'>
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleSubmit}
                                            edge="end"
                                        >
                                            <Send />
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />

                        </Box>
                    </Box>
                </Box>
            </Container>
            <Snack open={open} setOpen={setOpen} text={'Invalid place name'} />
        </Container>
    )
}
