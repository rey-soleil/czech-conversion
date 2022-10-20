import React, { useState } from "react";
import { useQuery } from "react-query";

const cnbURL = 'https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt';

export function Converter(){
    const [czechValue, setCzechValue] = useState(0);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCzechValue(Number(event.target.value));
    }

    const { status, data, error, isFetching } = useQuery(
        ['data'],
        async () => {
          const data = await (
            await fetch(cnbURL)
          ).json()
          return data
        }
    )

    console.log(data);
    
    return (
        <>
            <form>
                <input type='text' value={czechValue} onChange={handleChange}/>
                <select name='currency'>
                    <option>Pounds</option>
                    <option>Euros</option>
                    <option>Yen</option>
                </select>
                <input type='submit' value='convert'/>
            </form>
        </>
    );
}