import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './components/app/app';
import {Provider} from 'react-redux';
import {store} from './store';
import {checkAuthAction, fetchOffersAction} from './store/api-actions.ts';
import {CustomToastContainer} from './components/custom-toast/custom-toast.tsx';

store.dispatch(checkAuthAction());
store.dispatch(fetchOffersAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CustomToastContainer />
      <App />
    </Provider>
  </React.StrictMode>
);
