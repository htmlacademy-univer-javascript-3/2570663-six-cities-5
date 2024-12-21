import {memo} from 'react';
import {Link} from 'react-router-dom';

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
            <Link
              className={`locations__item-link tabs__item ${city === activeCity ? 'tabs__item--active' : ''}`}
              to="#"
              onClick={(e) => {
                e.preventDefault();
                onCityChange(city);
              }}
              role={'link'}
            >
              <span>{city}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export const CitiesList = memo(CitiesListComponent);
