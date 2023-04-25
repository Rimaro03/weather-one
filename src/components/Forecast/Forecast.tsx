import { Grid } from "@mui/material";
import React from "react";
import ForecastCard from "../ForecastCard/ForecastCard";
import { forecast, forecastdayElement } from "@/interfaces/weather";

interface ForecastProps {
    forecast: forecast | undefined,
    tempUnit: string,
    locale: string
}

export default function Forecast({ forecast, tempUnit, locale }: ForecastProps) {

    const getDayName = (dateStr: string, locale: string) => {
        var date = new Date(dateStr);
        return date.toLocaleDateString(locale, { weekday: 'long' });
    }


    return (
        <Grid container spacing={4}>
            {forecast!.forecastday.map((item: forecastdayElement, index: number) => {
                const dayName = getDayName(item.date, locale);
                let maxtemp = item.day.maxtemp_c;
                let mintemp = item.day.mintemp_c;
                let tempSymb = '°';
                if (tempUnit == 'fahrenheit') {
                    maxtemp = item.day.maxtemp_f;
                    mintemp = item.day.mintemp_f;
                    tempSymb = 'F'
                }

                return (
                    <ForecastCard day={dayName} icon={`https:${item.day.condition.icon}`} tempMax={`${maxtemp}${tempSymb}`} tempMin={`${mintemp}${tempSymb}`} key={index} />
                )
            })}
        </Grid>
    );
}