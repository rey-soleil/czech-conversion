import { Button, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { ExchangeRate } from "./App";
import './Converter.css';

export function Converter(props: {exchangeRates: ExchangeRate[]}){
    const [czechValue, setCzechValue] = useState(100);
    const [selectedExchangeRate, setSelectedExchangeRate] = useState(0);
    const [convertedValue, setConvertedValue] = useState(0);
    const [displayConvertedValue, setDisplayConvertedValue] = useState(false);

    const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCzechValue(Number(event.target.value));
    }

    const handleCurrencyChange = (event: SelectChangeEvent<number>) => {
        setSelectedExchangeRate(Number(event.target.value));
    }

    const handleConversion = () => {
        setConvertedValue(czechValue / selectedExchangeRate);
        setDisplayConvertedValue(true);
    }
    
    return (
        <div>
            <div className='converter'>
                Convert
                <TextField variant='outlined' type="number" value={czechValue} onChange={handleValueChange}/>
                CZK to
                <Select defaultValue={0} value={selectedExchangeRate} onChange={handleCurrencyChange}>
                    {props.exchangeRates.map((exchangeRate) => 
                        <MenuItem key={'select_' + exchangeRate.code} value={exchangeRate.rate}>{exchangeRate.code} ({exchangeRate.country})</MenuItem>
                    )}
                </Select>
                <Button variant='contained' onClick={handleConversion} disabled={selectedExchangeRate === 0}>GO</Button>
            </div>
            {displayConvertedValue && <Typography variant='h4'>{convertedValue.toFixed(2)}</Typography>}
        </div>
    );
}