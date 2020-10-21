import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoadAuth from './auth/load';
import NavBar from './components/modules/NavBar';
import ConfigCreate from './components/view/ConfigCreate';
import Login from './components/view/Login';
import Register from './components/view/Register';
import store from './redux/store';

export default () => {
  LoadAuth();

  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <NavBar />
        <div style={{ paddingTop: `${3.5}em` }} />
        <Route exact path="/" component={ConfigCreate} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Router>
    </Provider>,
    document.getElementById('root'),
  );
};
