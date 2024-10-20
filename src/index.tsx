import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {Data} from './const';
import {offers} from './mocks/offers.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      offersNumber={Data.OffersNumber}
      offers = {offers}
    />
  </React.StrictMode>
);
