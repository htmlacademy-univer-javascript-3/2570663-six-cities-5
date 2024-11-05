import { Link } from 'react-router-dom';
import './not-found-page.css';
import {Helmet} from 'react-helmet-async';
import {AppRoute} from '../../const.ts';

export function NotFoundPage() {
  return (
    <div className="not-found-container">
      <Helmet>
        <title>Not Found - 6 cities</title>
      </Helmet>
      <h1>404 Page Not Found</h1>
      <Link to={AppRoute.Main} className="button-link">
        Вернуться на главную страницу
      </Link>
    </div>
  );
}
