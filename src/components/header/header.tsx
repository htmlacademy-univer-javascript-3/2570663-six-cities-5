import {useAppDispatch, useAppSelector} from '../../hooks';
import {Link, useLocation} from 'react-router-dom';
import {AppRoute} from '../../const.ts';
import {logoutAction} from '../../store/api-actions.ts';

export function Header() {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.userData);
  const favoriteOffers = useAppSelector((state) => state.favoriteOffers);
  const location = useLocation();

  const isLoginPage = location.pathname === AppRoute.Login as string;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to={AppRoute.Main} className="header__logo-link header__logo-link--active">
              <img className="header__logo" src="/img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
          {!isLoginPage && (
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  {userData ?
                    <Link to={AppRoute.Favorites} className="header__nav-link header__nav-link--profile">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                        <img className="user__avatar" src={userData.avatarUrl} alt="avatar" />
                      </div>
                      <span className="header__user-name user__name">{userData.email}</span>
                      <span className="header__favorite-count">{favoriteOffers.length}</span>
                    </Link>
                    :
                    <Link to={AppRoute.Login} className="header__nav-link header__nav-link--profile">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__login">Sign in</span>
                    </Link>}
                </li>
                {userData &&
                  <li className="header__nav-item">
                    <Link
                      className="header__nav-link"
                      to={AppRoute.Main}
                      onClick={(evt) =>{
                        evt.preventDefault();
                        dispatch(logoutAction());
                      }}
                    >
                      <span className="header__signout">Sign out</span>
                    </Link>
                  </li>}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
