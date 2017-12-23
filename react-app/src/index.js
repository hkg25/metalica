import React from 'react';
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import MainAppWithStyles from "./main.js";
import StatusIndicator from './components/status-indicator/StatusIndicator';
import store from './store';

ReactDOM.render(
  	<Provider store={store}>
      <div>
        <StatusIndicator />
        <MainAppWithStyles />
      </div>
    </Provider>, document.getElementById("root"));
