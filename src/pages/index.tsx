import React, { useEffect, useState } from 'react'
import { Box, Container, Typography } from '@mui/material'
import { useRouter } from 'next/router'

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
    fetchData();
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
    <Container>
      <Box width={'30%'}></Box>
      <Box width={'70%'}></Box>
    </Container>
  )
}
