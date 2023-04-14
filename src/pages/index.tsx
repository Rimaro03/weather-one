import React, { useEffect, useState } from 'react'
import { AppBar, Backdrop, Box, Button, CircularProgress, Container, IconButton, InputAdornment, OutlinedInput, TextField, ToggleButton, ToggleButtonGroup, Toolbar, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { LocationSearching, Menu, Search, Send } from '@mui/icons-material';
import Image from 'next/image';
import StyledToggleButtonGroup from '@/components/ToggleButtonGroup/StyledToggleButtonGroup';
import ForecastCard from '@/components/ForecastCard/ForecastCard';

export default function Home() {
  const router = useRouter();
  const place = router.query.place;
  const [loading, setLoading] = useState(false);
  const [currentWeather, setCurrentWeather] = useState();
  const [forecast, setForecast] = useState();
  const [astronomy, setAstronomy] = useState();
  const baseURL = 'http://api.weatherapi.com/v1';
  const [tempUnit, setTempUnit] = useState('celsius');
  const [locale, setLocale] = useState('en-US')

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

  useEffect(() => {
    console.log(tempUnit);

  }, [tempUnit])

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
        setForecast(dataForecast.forecast);
        setAstronomy(dataAstronomy);
      })
      .catch(error => {
        console.error(`Error fetching data in the index page, redirecting...\n${error}`);
      })
  }

  const handleTempUnitChange = (event: React.MouseEvent<HTMLElement>, newValue: string) => {
    setTempUnit(newValue);
  }

  const getDayName = (dateStr: string, locale: string) => {
    var date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: 'long' });
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
              <Image src={`https:${currentWeather.current.condition.icon}`} height={64} width={64} alt={'Current weather image'} />
            </Box>
          </Box>
          <Box width={'70%'} sx={{ backgroundColor: '#f0f0f0' }}>
            <Box sx={{ margin: 2 }}>
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
              <Box sx={{ padding: '24px', display: 'flex', justifyContent: 'space-between' }}>
                {forecast.forecastday.map((item, index: number) => {
                  const dayName = getDayName(item.date, locale);
                  let maxtemp = item.day.maxtemp_c;
                  let mintemp = item.day.mintemp_c;
                  if (tempUnit == 'fahrenheit') {
                    maxtemp = item.day.maxtemp_f;
                    mintemp = item.day.mintemp_f;
                  }

                  return (
                    <ForecastCard day={dayName} icon={`https:${item.day.condition.icon}`} tempMax={maxtemp} tempMin={mintemp} key={index} />
                  )
                })}
              </Box>
            </Box>
          </Box>
        </>
      }
    </Box>
  )

}

export async function getServerSideProps(context: any) {
  return {
    props: {}, // will be passed to the page component as props
  }
}


