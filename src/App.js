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
import LineGraph from './components/LineGraph';
import "leaflet/dist/leaflet.css";
import { prettyPrintStat } from './components/util';


function App() {
  const [countries, setContries] = useState([]);

  const [ country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({})

  const [tableData, setTableDate] = useState([]);

  const [mapCenter, setMapCenter] = useState({lat: 34.80746, lng: -40.4796});
  const [mapZoom, setMapZoom] = useState(3);

  const [mapCoutries, setMapCountries] = useState([]);

  const [casesType, setCasesType] = useState("cases");
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
        setMapCountries(data);
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
      setCountryInfo(data);
      console.log(data.countryInfo);
      setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
      setMapZoom(4);
    });
  

  }


  // state is how to write variable in react 
  // naming covention
  return (
    <div className="app"> 
    <div className="app__left">
    <div className="app__header">
    <h1>COVID 19 TRACKER</h1>
    <FormControl className="app__dropdown">
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
      <div className="app__stats">
        <InfoBox 
        isRed
        active={casesType === "cases"}
        onClick = {e => setCasesType('cases')}
        title="Coronavirus Cases" 
        cases={prettyPrintStat(countryInfo.todayCases)} 
        total={countryInfo.cases} />

        <InfoBox 
        active={casesType === "recovered"}
        onClick={e => setCasesType('recovered')}
        title="Recovered" 
        cases={prettyPrintStat(countryInfo.todayRecovered)} 
        total={countryInfo.recovered}/>

        <InfoBox 
        isRed
        active={casesType === "deaths"}
        onClick={e => setCasesType('deaths')}
        title="Deaths" 
        cases={prettyPrintStat(countryInfo.todayDeaths)} 
        total={countryInfo.deaths}/>
      </div>
      {/* infoBoxs */}
      {/* infoBoxs */}

      

      {/* Map  */}
      <Map
      casesType={casesType}
      countries={mapCoutries} 
      center={mapCenter}
      zoom={mapZoom}
      />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
           {/* table */}
           <Tables countries={tableData}/>
           <h3> Worldwide new {casesType}</h3>
          {/* Graph */}

          <LineGraph casesType={casesType}/>
        </CardContent>
        
      </Card>
    </div>
  );
}

export default App;
