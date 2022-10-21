import { MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ExchangeRate } from "./App";
import './Converter.css';

export function Converter(props: {exchangeRates: ExchangeRate[]}){
    const [czechValue, setCzechValue] = useState(100);
    const [selectedExchangeRate, setSelectedExchangeRate] = useState(0);
    const [convertedValue, setConvertedValue] = useState(0);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCzechValue(Number(event.target.value));
    }

    const handleCurrencyChange = (event: SelectChangeEvent<number>) => {
        setSelectedExchangeRate(Number(event.target.value));
    }

    useEffect(() => {
        setConvertedValue(czechValue / selectedExchangeRate);
    }, [czechValue, selectedExchangeRate]);
    
    return (
        <div className='converter'>
            <TextField variant='outlined' type="number" value={czechValue} onChange={handleChange}/>
            <Typography fontStyle='bold'>CZK</Typography>
             in
            <Select defaultValue={0} value={selectedExchangeRate} onChange={handleCurrencyChange}>
                {props.exchangeRates.map((exchangeRate) => 
                    <MenuItem key={'select_' + exchangeRate.code} value={exchangeRate.rate}>{exchangeRate.code} ({exchangeRate.country})</MenuItem>
                )}
            </Select>
            = {convertedValue.toFixed(2)}
        </div>
    );
}