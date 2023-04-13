import React, { ChangeEvent, FormEvent, KeyboardEventHandler, useState } from 'react'
import { AppBar, Backdrop, Box, CircularProgress, Container, IconButton, InputAdornment, OutlinedInput, Toolbar, Typography } from '@mui/material'
import { LocationSearching, Send } from '@mui/icons-material';
import Image from 'next/image';
import Logo from '../../public/logo.svg';
import { useRouter } from 'next/router';
import Snack from '@/components/Snack/Snack';

export default function Place() {
    const [place, setPlace] = useState('');
    const [alertOpen, setalertOpen] = useState(false);
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const inputChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setPlace(e.target.value);
    };

    const openAlert = () => {
        setalertOpen(true);
    }

    const keyPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key == 'Enter'){
            handleSubmit();
        }
    }

    const handleSubmit = (e?: FormEvent) => {
        e?.preventDefault();
        setLoading(true)
        if (place.length > 0) {
            const url = `http://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_API_KEY}&q=${place}&aqi=no`;
            fetch(url)
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                    throw res;
                })
                .then(() => {
                    router.push({
                        pathname: '/',
                        query: { place: place }
                    })
                })
                .catch(error => {
                    console.error(`Error fetching data from ${url}\n${error}`);
                    setText('Invalid place name');
                    openAlert();
                })
                .finally(() => {
                    setLoading(false);
                })
        }
        else {
            setText('Invalid place name');
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
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                {loading ?
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={loading}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                    :
                    <>

                        <Box sx={{ margin: '10px', backgroundColor: '#f0f0f0', borderRadius: 5 }}>
                            <Box sx={{ margin: 7 }}>
                                <Typography variant='h5'>Select a location</Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                    <OutlinedInput
                                        onChange={inputChange}
                                        onKeyDown={keyPressed}
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

                        <Snack open={alertOpen} setOpen={setalertOpen} text={text} /></>}
            </Container>
        </Container>
    )
}
