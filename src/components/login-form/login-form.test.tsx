import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from './login-form';
import {loginAction} from '../../store/api-actions';
import {withHistory, withStore} from '../../utils/mock-component.tsx';
import {showCustomToast} from '../../utils/show-custom-toast.tsx';

vi.mock('../custom-toast/custom-toast', () => ({
  CustomToast: vi.fn(() => null),
}));

vi.mock('../../utils/show-custom-toast', () => ({
  showCustomToast: vi.fn(),
}));

describe('LoginForm Component', () => {
  it('should render the form correctly', () => {
    const { withStoreComponent } = withStore(
      withHistory(<LoginForm />),
      {}
    );

    render(withStoreComponent);

    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
  });

  it('should dispatch loginAction with valid email and password', async () => {
    const { withStoreComponent, mockStore } = withStore(
      withHistory(<LoginForm />),
      {}
    );

    render(withStoreComponent);

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByRole('button', { name: 'Sign in' });

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'Password123');
    await userEvent.click(submitButton);

    const actions = mockStore.getActions();
    expect(actions[0].type).toBe(loginAction.pending.type);
  });

  it('should show a toast message if password is invalid', async () => {
    const { withStoreComponent } = withStore(
      withHistory(<LoginForm />),
      {}
    );

    render(withStoreComponent);

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByRole('button', { name: 'Sign in' });

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'invalid');
    await userEvent.click(submitButton);

    expect(showCustomToast).toHaveBeenCalledWith(
      'Password must contain at least one letter, one number, and no spaces.'
    );
  });

  it('should not dispatch loginAction if email or password is missing', async () => {
    const { withStoreComponent, mockStore } = withStore(
      withHistory(<LoginForm />),
      {}
    );

    render(withStoreComponent);

    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByRole('button', { name: 'Sign in' });

    await userEvent.type(passwordInput, 'Password123');
    await userEvent.click(submitButton);

    const actions = mockStore.getActions();
    expect(actions).toEqual([]);
  });
});
