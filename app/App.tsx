import React from 'react';
import AppRoute from './route';
import {store} from './store';
import {Provider} from 'react-redux';
const App = () => (
  <Provider store={store}>
    <AppRoute />
  </Provider>
);

export default App;
