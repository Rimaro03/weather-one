import React, { useEffect, useState } from 'react'
import { AppBar, Backdrop, Box, CircularProgress, Grid, IconButton, InputAdornment, TextField, ToggleButton, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useRouter } from 'next/router'
import { LocationSearching, Search, } from '@mui/icons-material';
import Image from 'next/image';
import StyledToggleButtonGroup from '@/components/ToggleButtonGroup/StyledToggleButtonGroup';
import ForecastCard from '@/components/ForecastCard/ForecastCard';
import Gauge from '@/components/Gauge/Gauge';
import Forecast from '@/components/Forecast/Forecast';
import { astronomy, currentweather, forecast } from '@/interfaces/weather';
import Header from '@/components/Header/Header';
import Today from '@/components/Today/Today';
import SideMenu from '@/components/SideMenu/SideMenu';

export default function Home() {
  const router = useRouter();
  const place = router.query.place;
  const [loading, setLoading] = useState(false);
  const [currentWeather, setCurrentWeather] = useState<currentweather>();
  const [forecast, setForecast] = useState<forecast>();
  const [astronomy, setAstronomy] = useState<astronomy>();
  const baseURL = 'http://api.weatherapi.com/v1';
  const [tempUnit, setTempUnit] = useState('celsius');
  const [locale, setLocale] = useState('en-US')
  const mediaSmall = useMediaQuery(useTheme().breakpoints.down('md'));

  useEffect(() => {
    setLoading(true);
    if (!place || place?.length == 0) {
      router.push('/place')
    }
    fetchData()
      .then(() => {
        setLoading(false);
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(tempUnit);

  }, [tempUnit])

  const fetchData = async () => {
    Promise.all([
      fetch(`${baseURL}/current.json?key=${process.env.NEXT_PUBLIC_API_KEY}&q=${place}&aqi=yes`),
      fetch(`${baseURL}/forecast.json?key=${process.env.NEXT_PUBLIC_API_KEY}&q=${place}&days=6&aqi=no&alerts=no`),
      fetch(`${baseURL}/astronomy.json?key=${process.env.NEXT_PUBLIC_API_KEY}&q=${place}`)
    ])
      .then(([resCurrentWeather, resForecast, resAstronomy]) => {
        if (resCurrentWeather.ok && resForecast.ok && resAstronomy.ok) {
          return Promise.all([resCurrentWeather.json(), resForecast.json(), resAstronomy.json()])
        }
        throw [resCurrentWeather, resForecast, resAstronomy];
      })
      .then(([dataCurrentWeather, dataForecast, dataAstronomy]) => {
        setCurrentWeather(dataCurrentWeather);
        setForecast(dataForecast.forecast);
        setAstronomy(dataAstronomy.astronomy);
        
      })
      .catch(error => {
        console.error(`Error fetching data in the index page, redirecting...\n${error}`);
      })
  }

  const handleTempUnitChange = (event: React.MouseEvent<HTMLElement>, newValue: string) => {
    setTempUnit(newValue);
  }

  return (
    <Box sx={{ display: 'flex', height: '100%', boxShadow: 2 }}>
      {!currentWeather || loading ?
        <Backdrop open={loading}>
          <CircularProgress />
        </Backdrop>
        :
        <>
        {!mediaSmall ? <SideMenu currentWeather={currentWeather} /> : <></>}
          <Box width={!mediaSmall ? '70%' : '100%'} sx={{ backgroundColor: '#f0f0f0', display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
            <Box sx={{ margin: 2 }}>
              <Header handleTempUnitChange={handleTempUnitChange} tempUnit={tempUnit} />
              <Forecast forecast={forecast} tempUnit={tempUnit} locale={locale} />
              <Today currentWeather={currentWeather} astronomy={astronomy!}/>
            </Box>
          </Box>
        </>
      }
    </Box>
  )

}

export async function getServerSideProps(context: any) {
  return {
    props: {},
  }
}


