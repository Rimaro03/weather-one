import React, { useEffect, useState } from 'react'
import { Backdrop, Box, CircularProgress, Container, IconButton, InputAdornment, OutlinedInput, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { LocationSearching, Search, Send } from '@mui/icons-material';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();
  const place = router.query.place;
  const [loading, setLoading] = useState(false);
  const [currentWeather, setCurrentWeather] = useState();
  const [forecast, setForecast] = useState();
  const [astronomy, setAstronomy] = useState();
  const baseURL = 'http://api.weatherapi.com/v1';

  useEffect(() => {
    setLoading(true);
    if (!place || place?.length == 0) {
      router.push('/place')
    }
    fetchData()
      .then(() => {
        setLoading(false);
      })
  }, []);

  const fetchData = async () => {
    Promise.all([
      fetch(`${baseURL}/current.json?key=${process.env.NEXT_PUBLIC_API_KEY}&q=${place}&aqi=yes`),
      fetch(`${baseURL}/forecast.json?key=${process.env.NEXT_PUBLIC_API_KEY}&q=${place}&days=7&aqi=no&alerts=no`),
      fetch(`${baseURL}/astronomy.json?key=${process.env.NEXT_PUBLIC_API_KEY}&q=${place}&dt=2023-04-12`)
    ])
      .then(([resCurrentWeather, resForecast, resAstronomy]) => {
        if (resCurrentWeather.ok && resForecast.ok && resAstronomy.ok) {
          return Promise.all([resCurrentWeather.json(), resForecast.json(), resAstronomy.json()])
        }
        throw [resCurrentWeather, resForecast, resAstronomy];
      })
      .then(([dataCurrentWeather, dataForecast, dataAstronomy]) => {
        setCurrentWeather(dataCurrentWeather);
        setForecast(dataForecast);
        setAstronomy(dataAstronomy);
      })
      .catch(error => {
        console.error(`Error fetching data in the index page, redirecting...\n${error}`);
      })

  }

  return (
    <Box sx={{ display: 'flex', height: '95vh', marginLeft: 30, marginRight: 30, boxShadow: 2 }}>
      {!currentWeather || loading ?
        <Backdrop open={loading}>
          <CircularProgress />
        </Backdrop>
        :
        <>
          <Box width={'30%'} sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', margin: 'auto' }}>
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
              <Image src={`https:${currentWeather.current.condition.icon}`} height={64} width={64} alt={'Current weather image'}/>
            </Box>
          </Box>
          <Box width={'70%'} sx={{ backgroundColor: '#f0f0f0' }}></Box></>
      }
    </Box>
  )

}

export async function getServerSideProps(context: any) {
  return {
    props: {}, // will be passed to the page component as props
  }
}


