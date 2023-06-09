import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react"

interface ForecastCardProps {
    day: string,
    icon: string,
    tempMin: string,
    tempMax: string
}

export default function ForecastCard({ day, icon, tempMin, tempMax }: ForecastCardProps) {
    return (
        <Grid
            item
            sm={6}
            md={4}
            xl={2}
            sx={{
                transition: 'transform .2s',
                ":hover": {
                    cursor: 'pointer',
                    transform: 'scale(1.1)'
                }
            }}>
            <Box sx={{ backgroundColor: '#FFF', borderRadius: 5, }}>
                <Box sx={{ margin: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography>
                        {day.slice(0, 3)}
                    </Typography>
                    <Image src={icon} alt='weather icon' width={64} height={64} />
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography sx={{ margin: 0.5 }}>{tempMax}</Typography>
                        <Typography variant='subtitle1' sx={{ margin: 0.5 }} color={'#828282'}>{tempMin}</Typography>
                    </Box>
                </Box>
            </Box>
        </Grid>
    );
}