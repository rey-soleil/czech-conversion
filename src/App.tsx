import { Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';
import { Converter } from './Converter';

/* Note: we need to use a proxy to get the resource, else we get
 Access to XMLHttpRequest ... from origin 'http://localhost:3000'
 has been blocked by CORS policy: No 'Access-Control-Allow-Origin' 
 header is present on the requested resource. */
const corsAnywhereURL = 'https://cors-anywhere.herokuapp.com/'
const cnbURL = 'https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt';
const exchangeRegex = /(?<country>[A-Za-z ]*)\|(?<currency>[A-Za-z ]*)\|(?<amount>[0-9]*)\|(?<code>[A-Z]{3})\|(?<rate>[0-9.]*)/m

export type ExchangeRate = {
  country: string,
  currency: string,
  amount: number,
  code: string,
  rate: number,
}

function App() {
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>();

  async function getExchangeRates(){
    const {data} = await axios.get(corsAnywhereURL+cnbURL);
    const exchangeArray = data.split('\n').map((line: string) => {
      const groups = line.match(exchangeRegex)?.groups;
      return groups && {
        country: groups.country,
        currency: groups.currency,
        amount: Number(groups.amount),
        code: groups.code,
        rate: Number(groups.rate),
      };
    }).filter((e: {} | undefined) => e !== undefined);
    setExchangeRates(exchangeArray);
  }

  useEffect(() => {
    getExchangeRates();
  }, []);
  
  return (
    <div className="App">
      <Typography variant='h3'>Currency converter</Typography>
      <Converter exchangeRates={exchangeRates || []}/>
    </div>
  );
}

export default App;
