import React from 'react';
import { render, screen } from '@testing-library/react';
import { useMap } from './useMap';
import { City } from '../../types/offer';

const MapWrapper = ({ city }: { city: City }) => {
  const mapRef = React.useRef(null);
  useMap(mapRef, city);

  return <div data-testid="map-container" ref={mapRef}></div>;
};

describe('useMap', () => {
  const mockCity: City = {
    location: {
      latitude: 52.370216,
      longitude: 4.895168,
      zoom: 10,
    },
    name: 'Amsterdam',
  };

  it('should initialize map correctly', () => {
    render(<MapWrapper city={mockCity} />);

    const mapContainer = screen.getByTestId('map-container');
    expect(mapContainer).toBeInTheDocument();

    expect(mapContainer.childElementCount).toBe(2);
  });

  it('should update map center and zoom when city changes', () => {
    const { rerender } = render(<MapWrapper city={mockCity} />);

    const newCity: City = {
      location: {
        latitude: 48.8566,
        longitude: 2.3522,
        zoom: 12,
      },
      name: 'Paris',
    };

    rerender(<MapWrapper city={newCity} />);

    const mapContainer = screen.getByTestId('map-container');
    expect(mapContainer.childElementCount).toBe(2);
  });

  it('should not initialize map if mapRef is null', () => {
    const MapWithoutRef = ({ city }: { city: City }) => {
      useMap({ current: null }, city);
      return <div data-testid="map-container"></div>;
    };

    render(<MapWithoutRef city={mockCity} />);

    const mapContainer = screen.getByTestId('map-container');
    expect(mapContainer.childElementCount).toBe(0);
  });
});

