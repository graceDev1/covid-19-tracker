import React, { useState, useEffect} from 'react';
import './App.css';
import { 
  FormControl, 
  MenuItem,
  Select
} from '@material-ui/core';
import InfoBox from './components/InfoBox';
import Map from './components/Map';
function App() {
  const [countries, setContries] = useState([]);

  const [ country, setCountry] = useState('worldwide');

  // useeffect runs a piece of code based on a given condition
  useEffect(()=>{
    // the code inside here will  run once 
    // when the component loads and not again 
    // --> asynch -> send a request to the server, wait for for it, do something
    const getCountriesData = async () =>{
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response)=> response.json())
      .then((data)=> {
        const countries = data.map((country)=>(
          {
            name: country.country,
            value: country.countryInfo.iso2
          }
        ));
        setContries(countries);
      })
    }
    getCountriesData();
  }, [])

  const onCountryChange = async (event)=>{
    const countryCode = event.target.value;
    setCountry(countryCode);
  }


  // state is how to write variable in react 
  // naming covention
  return (
    <div className="app"> 
    <div className="app_header">
    <h1>COVID 19 TRACKER</h1>
    <FormControl className="app_dropdown">
      <Select 
      variant="outlined"
      value={country} 
      onChange={onCountryChange}>
        {/* loop through all the countries */}
        <MenuItem value="worldwide">Wordwide</MenuItem>
        {
          countries.map((country) =>(
          <MenuItem value={country.value}>{country.name}</MenuItem>
          ))
        }
        
      </Select>
    </FormControl>
    </div>
      {/* header */}
      {/* Title * select input field */}

      {/* infoBoxs title="coronaavirus cases" */}
      <div className="app_stats">
        <InfoBox title="Coronavirus Cases" cases={123} total={2000} />

        <InfoBox title="Recovered" cases={12234} total={3000}/>

        <InfoBox title="Deaths" cases={12345} total={4000}/>
      </div>
      {/* infoBoxs */}
      {/* infoBoxs */}

      {/* table */}
      {/* Graph */}

      {/* Map  */}
      <Map/>
    </div>
  );
}

export default App;
