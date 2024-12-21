import React, {useEffect, useRef, useState} from 'react';
import {City} from '../../types/offer.ts';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

export function useMap(mapRef: React.MutableRefObject<null>, city: City) {
  const [map, setMap] = useState<leaflet.Map | null>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (mapRef.current !== null) {
      if (!isRenderedRef.current) {
        const instance = leaflet.map(mapRef.current, {
          center: {
            lat: city.location.latitude,
            lng: city.location.longitude,
          },
          zoom: city.location.zoom,
        });

        leaflet
          .tileLayer(
            'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
            {
              attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            },
          )
          .addTo(instance);

        setMap(instance);
        isRenderedRef.current = true;
      } else {
        map?.setView(
          {
            lat: city.location.latitude,
            lng: city.location.longitude,
          },
          city.location.zoom
        );
      }

    }
  }, [mapRef, city, map]);

  return map;
}
