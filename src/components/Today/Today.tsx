import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import Gauge from "../Gauge/Gauge";
import { currentweather } from "@/interfaces/weather";

interface TodayProps{
    currentWeather: currentweather
}

export default function Today({currentWeather}: TodayProps){
    return(
        <Box sx={{ padding: '24px', justifyContent: 'space-between' }}>
        <Typography variant="h5" component="div" fontWeight={'500'}>Today&apos;s Highlits</Typography>
        <Grid container spacing={2} mt={1}>
          <Grid item xl={4} md={12} sm={12}>
            <Box sx={{ backgroundColor: '#FFF', margin: 1, padding: 1 }}>
              <Typography>UV Index</Typography>
              <Gauge min={0} max={15} value={currentWeather.current.uv} />
            </Box>
          </Grid>
          <Grid item xl={4} md={12} sm={12}>
            <Box sx={{ backgroundColor: '#FFF', margin: 1 }}>
              <Typography>UV Index</Typography>
              <Gauge min={0} max={15} value={currentWeather.current.uv} />
            </Box>
          </Grid>
          <Grid item xl={4} md={12} sm={12}>
            <Box sx={{ backgroundColor: '#FFF', margin: 1 }}>
              <Typography>UV Index</Typography>
              <Gauge min={0} max={15} value={currentWeather.current.uv} />
            </Box>
          </Grid>
          <Grid item xl={4} md={12} sm={12}>
            <Box sx={{ backgroundColor: '#FFF', margin: 1 }}>
              <Typography>UV Index</Typography>
              <Gauge min={0} max={15} value={currentWeather.current.uv} />
            </Box>
          </Grid>
          <Grid item xl={4} md={12} sm={12}>
            <Box sx={{ backgroundColor: '#FFF', margin: 1 }}>
              <Typography>UV Index</Typography>
              <Gauge min={0} max={15} value={currentWeather.current.uv} />
            </Box>
          </Grid>
          <Grid item xl={4} md={12} sm={12}>
            <Box sx={{ backgroundColor: '#FFF', margin: 1 }}>
              <Typography>UV Index</Typography>
              <Gauge min={0} max={15} value={currentWeather.current.uv} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
}