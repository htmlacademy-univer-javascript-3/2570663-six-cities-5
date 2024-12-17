import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { HistoryRouter } from './history-route';
import { Route, Routes } from 'react-router-dom';
import { act } from 'react-dom/test-utils';

describe('Component: HistoryRouter', () => {
  let history: MemoryHistory;

  beforeEach(() => {
    history = createMemoryHistory();
  });

  it('should render children correctly', async () => {
    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/about" element={<div>About Page</div>} />
        </Routes>
      </HistoryRouter>
    );

    expect(screen.getByText('Home Page')).toBeInTheDocument();

    act(() => {
      history.push('/about');
    });

    await waitFor(() => {
      expect(screen.getByText('About Page')).toBeInTheDocument();
    });
  });

  it('should update state when history changes', async () => {
    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/about" element={<div>About Page</div>} />
        </Routes>
      </HistoryRouter>
    );

    expect(history.location.pathname).toBe('/');
    expect(screen.getByText('Home Page')).toBeInTheDocument();

    act(() => {
      history.push('/about');
    });

    await waitFor(() => {
      expect(history.location.pathname).toBe('/about');
      expect(screen.getByText('About Page')).toBeInTheDocument();
    });
  });

  it('should handle basename correctly', async () => {
    history = createMemoryHistory({ initialEntries: ['/base/about'] });

    render(
      <HistoryRouter history={history} basename="/base">
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/about" element={<div>About Page</div>} />
        </Routes>
      </HistoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('About Page')).toBeInTheDocument();
    });
  });
});
