import {Helmet} from 'react-helmet-async';
import {LoginForm} from '../../components/login-form/login-form.tsx';
import {Header} from '../../components/header/header.tsx';

export function LoginPage() : JSX.Element {
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
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
