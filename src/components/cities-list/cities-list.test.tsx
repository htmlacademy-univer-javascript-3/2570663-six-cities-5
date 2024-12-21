import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { CitiesList } from './cities-list';

describe('Component: CitiesList', () => {
  const mockCities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];
  const mockActiveCity = 'Paris';
  const mockOnCityChange = vi.fn();

  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <CitiesList
          cities={mockCities}
          activeCity={mockActiveCity}
          onCityChange={mockOnCityChange}
        />
      </BrowserRouter>
    );

    mockCities.forEach((city) => {
      expect(screen.getByText(city)).toBeInTheDocument();
    });

    const activeCityLink = screen.getByRole('link', { name: mockActiveCity });
    expect(activeCityLink).toHaveClass('tabs__item--active');

    mockCities
      .filter((city) => city !== mockActiveCity)
      .forEach((city) => {
        const cityLink = screen.getByRole('link', { name: city });
        expect(cityLink).not.toHaveClass('tabs__item--active');
      });
  });

  it('should call onCityChange with the correct city when a city is clicked', async () => {
    render(
      <BrowserRouter>
        <CitiesList
          cities={mockCities}
          activeCity={mockActiveCity}
          onCityChange={mockOnCityChange}
        />
      </BrowserRouter>
    );

    const cityToClick = 'Cologne';
    const cityLink = screen.getByRole('link', { name: cityToClick });

    await userEvent.click(cityLink);

    expect(mockOnCityChange).toHaveBeenCalledWith(cityToClick);

    expect(mockOnCityChange).toHaveBeenCalledTimes(1);
  });
});
