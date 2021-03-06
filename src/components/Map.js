import React from 'react'
import '../Map.css';
// react-leaflet for using map
import { Map as LeafletMap, TileLayer} from 'react-leaflet';

import { showDataOnMap } from './util';

function Map({countries,casesType, center, zoom}) {
    return (
        <div className="map">
            <LeafletMap center={center} zoom={zoom}>
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreelMap</a> contributors'
                />
                {/* Loop throw countries and draw circles on the screen */}
                { showDataOnMap(countries, casesType)}
            </LeafletMap>
        </div>
    )
}

export default Map
