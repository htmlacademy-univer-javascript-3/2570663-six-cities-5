import {memo} from 'react';

type CitiesListProps = {
  cities: string[];
  activeCity: string;
  onCityChange: (city: string) => void;
};

function CitiesListComponent({ cities, activeCity, onCityChange }: CitiesListProps) {
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city) => (
          <li className="locations__item" key={city}>
            <a
              className={`locations__item-link tabs__item ${city === activeCity ? 'tabs__item--active' : ''}`}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onCityChange(city);
              }}
            >
              <span>{city}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export const CitiesList = memo(CitiesListComponent);
