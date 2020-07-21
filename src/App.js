import React, { useState, useEffect} from 'react';
import './App.css';
import { 
  FormControl, 
  MenuItem,
  Select,
  Card,
  CardContent
} from '@material-ui/core';
import InfoBox from './components/InfoBox';
import Map from './components/Map';
import Tables from './components/Tables';
import { SortData} from './components/util';



function App() {
  const [countries, setContries] = useState([]);

  const [ country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({})

  const [tableData, setTableDate] = useState([]);

  // useEffect to fetch all data
  useEffect(()=>{
     fetch('https://disease.sh/v3/covid-19/all')
     .then(res => res.json())
     .then(data => {
       setCountryInfo(data);
     })
  },[]);

  // useeffect runs a piece of code based on a given condition
  useEffect(()=>{
    // the code inside here will  run once 
    // when the component loads and not again 
    //https://disease.sh/v3/covid-19/countries/[country_code]
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

        const sortedData = SortData(data);
        setTableDate(sortedData)
        setContries(countries);
      })
    }
    getCountriesData();
  }, [])

  const onCountryChange = async (event)=>{
    const countryCode = event.target.value;
    setCountry(countryCode);
    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all': `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
    .then(res => res.json())
    .then(data=>{
      setCountry(countryCode);
      // all of the data
      // from the country response
      setCountryInfo(data)
    });
    console.log('COUNTRY INFO >>>>>>>',countryInfo);

  }


  // state is how to write variable in react 
  // naming covention
  return (
    <div className="app"> 
    <div className="app_left">
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
        <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />

        <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>

        <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
      </div>
      {/* infoBoxs */}
      {/* infoBoxs */}

     

      {/* Map  */}
      <Map/>
      </div>
      <Card className="app_right">
        <CardContent>
          <h3>Live Cases by Country</h3>
           {/* table */}
           <Tables countries={tableData}/>
           <h3> Worldwide new cases</h3>
          {/* Graph */}
        </CardContent>
        
      </Card>
    </div>
  );
}

export default App;
