import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { AppContainer } from 'react-hot-loader';
import registerServiceWorker, { unregister } from './registerServiceWorker';

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  )
};

render(App);

if (module.hot) {
  module.hot.accept('./components/App', () => { render(App) })
}
unregister();
