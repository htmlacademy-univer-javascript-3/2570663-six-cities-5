import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CitiesList } from './cities-list';

describe('Component: CitiesList', () => {
  const mockCities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];
  const mockActiveCity = 'Paris';
  const mockOnCityChange = vi.fn();

  it('should render correctly', () => {
    render(
      <CitiesList
        cities={mockCities}
        activeCity={mockActiveCity}
        onCityChange={mockOnCityChange}
      />
    );

    mockCities.forEach((city) => {
      expect(screen.getByText(city)).toBeInTheDocument();
    });

    const activeCityLink = screen.getByRole('link', { name: mockActiveCity });
    expect(activeCityLink).toHaveClass('tabs__item--active');
  });

  it('should call onCityChange with the correct city when a city is clicked', async () => {
    render(
      <CitiesList
        cities={mockCities}
        activeCity={mockActiveCity}
        onCityChange={mockOnCityChange}
      />
    );

    const cityToClick = 'Cologne';
    const cityLink = screen.getByRole('link', { name: cityToClick });

    await userEvent.click(cityLink);

    expect(mockOnCityChange).toHaveBeenCalledWith(cityToClick);
  });
});
