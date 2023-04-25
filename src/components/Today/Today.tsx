import { Box, Grid, Icon, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import React from "react";
import Gauge from "../Gauge/Gauge";
import { astronomy, currentweather } from "@/interfaces/weather";
import { North, WbSunny, WbTwilight } from "@mui/icons-material";

interface TodayProps {
  currentWeather: currentweather,
  astronomy: astronomy
}

export default function Today({ currentWeather, astronomy }: TodayProps) {
  let arr = [0, 1, 2, 3]
  return (
    <Box sx={{ padding: '24px', justifyContent: 'space-between' }}>
      <Typography variant="h5" component="div" fontWeight={'500'}>Today&apos;s Highlits</Typography>
      <Grid container spacing={2} mt={1} sx={{ display: 'flex', flexDirection: 'row' }}>
        <Grid item xl={4} md={6} sm={6}>
          <Box sx={{ backgroundColor: '#FFF', margin: 1, padding: 2, borderRadius: 5 }} >
            <Typography variant={"h6"} color={'#828282'}>UV Index</Typography>
            <Box width={'100%'} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box width={'60%'}>
                <Gauge min={0} max={15} value={currentWeather.current.uv} />
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xl={4} md={6} sm={6}>
          <Box sx={{ backgroundColor: '#FFF', margin: 1, padding: 2, borderRadius: 5 }}>
            <Typography variant={"h6"} color={'#828282'}>Wind Status</Typography>
            <Box width={'100%'} sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, width: 'min-content' }}>
              <Typography variant="h2" >{currentWeather.current.wind_kph}</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', mb: 1.5 }}>
                <Typography >km/h</Typography>
              </Box>
            </Box>
            <Box>
              <ListItem>
                <ListItemIcon >
                  <North />
                </ListItemIcon>
                <ListItemText primary={currentWeather.current.wind_dir} />
              </ListItem>
            </Box>
          </Box>
        </Grid>
        <Grid item xl={4} md={6} sm={6}>
          <Box sx={{ backgroundColor: '#FFF', margin: 1, padding: 2, borderRadius: 5 }}>
            <Typography variant={"h6"} color={'#828282'}>Sunrise & Sunset</Typography>
            <Box width={'100%'} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', mt: 1 }}>
              <ListItem>
                <ListItemIcon >
                  <WbSunny sx={{ color: "#F9BF67" }} fontSize="large" />
                </ListItemIcon>
                <ListItemText primary={astronomy.astro.sunrise} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <WbTwilight sx={{ color: "#F9BF67" }} fontSize="large" />
                </ListItemIcon>
                <ListItemText primary={astronomy.astro.sunset} />
              </ListItem>
            </Box>
          </Box>
        </Grid>
        <Grid item xl={4} md={6} sm={6}>
          <Box sx={{ backgroundColor: '#FFF', margin: 1, padding: 2, borderRadius: 5 }}>
            <Typography variant={"h6"} color={'#828282'}>Humidity</Typography>
            <Box width={'100%'} sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, width: 'min-content' }}>
              <Typography variant="h2" >{currentWeather.current.humidity}</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', mt: 1.5 }}>
                <Typography>%</Typography>
              </Box>
            </Box>
            <Box>
              <Typography variant="h6">Normal</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}