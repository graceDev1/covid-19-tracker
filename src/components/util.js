import React from 'react';
import { Circle, Popup} from 'react-leaflet';
import numeral from 'numeral';
const casesTypeColors = { 
   cases:{
    hex:"#cc1034",
    rgb: "rgb(204, 16, 52)",
    half_op: "rgba(204, 16, 52, 0.5)",
    multiplier: 800
},
recovered:{
    hex:"#7dd71d",
    rgb: "rgb(125, 215, 29)",
    half_op: "rgba(125, 215, 29, 0.5)",
    multiplier: 1200
},
deaths:{
    hex:"#fb4443",
    rgb: "rgb(251, 68, 67)",
    half_op: "rgba(251, 68, 67, 0.5)",
    multiplier: 200
}

}


export const SortData = (data) =>{
    const sortedData = [...data];
    return sortedData.sort((a,b)=>(a.cases > b.cases ? -1 : 1));
}


// Draw circles on the map with interaction tooltop
export const showDataOnMap = (data, casesType="cases") =>{
    data.map(country => (
        <Circle
        center={[country.countryInfo.lat, country.countryInfo.long]}
        fillOpacity={0.4}
        color={casesTypeColors[casesType].hex}
        fillColor = {casesTypeColors[casesType].hex}
        radius = {
            Math.sqrt(country[casesType] * casesTypeColors[casesType].multiplier)
        }
        >
        <Popup>
           
        </Popup> 
        </Circle>
    ))
};