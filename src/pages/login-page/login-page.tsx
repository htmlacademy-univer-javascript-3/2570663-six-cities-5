import { Helmet } from 'react-helmet-async';
import { LoginForm } from '../../components/login-form/login-form.tsx';
import { Header } from '../../components/header/header.tsx';
import {memo, useCallback, useMemo} from 'react';
import { Link } from 'react-router-dom';
import {AppRoute, CITIES} from '../../const';
import {useAppDispatch} from '../../hooks';
import {setCity} from '../../store/slices/city-slice.ts';

function LoginPageComponent() {
  const dispatch = useAppDispatch();

  const randomCity = useMemo(() => CITIES[Math.floor(Math.random() * CITIES.length)], []);

  const handleCityClick = useCallback(() => {
    dispatch(setCity(randomCity));
  }, [dispatch, randomCity]);

  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>Log In - 6 cities</title>
      </Helmet>
      <Header />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <LoginForm />
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link
                className="locations__item-link"
                to={AppRoute.Main}
                onClick={handleCityClick}
                role={'link-to-main'}
              >
                <span>{randomCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export const LoginPage = memo(LoginPageComponent);
