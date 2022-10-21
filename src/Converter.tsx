import React, { useState } from "react";
import { ExchangeRate } from "./App";

// Country|Currency|Amount|Code|Rate
// Australia|dollar|1|AUD|15.771
// Brazil|real|1|BRL|4.770
// Bulgaria|lev|1|BGN|12.538

const exampleExchangeData = [
    {
        country: 'Australia',
        currency: 'dollar',
        amount: 1,
        code: 'AUD',
        rate: 15.771,
    },
    {
        country: 'Brazil',
        currency: 'real',
        amount: 1,
        code: 'BRL',
        rate: 4.770,
    },
    {
        country: 'Bulgaria',
        currency: 'lev',
        amount: 1,
        code: 'BGN',
        rate: 12.538,
    },
]

export function Converter(props: {exchangeRates: ExchangeRate[]}){
    const [czechValue, setCzechValue] = useState(0);
    const [selectedExchangeData, setSelectedExchangeData] = useState(exampleExchangeData[0]);
    const [convertedValue, setConvertedValue] = useState(0);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCzechValue(Number(event.target.value));
    }

    const convert = () => {
        setConvertedValue(czechValue * selectedExchangeData['rate']);
    }
    
    return (
        <>
            <form onSubmit={convert}>
                <input type='text' value={czechValue} onChange={handleChange}/>
                <select name='currency'>
                    {props.exchangeRates.map(value => (
                        <option>{value.code} ({value.country} {value.currency})</option>
                    ))}
                </select>
                <input type='submit' value='convert'/>
            </form>
            {convertedValue && <div>{convertedValue}</div>}
        </>
    );
}