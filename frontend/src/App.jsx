import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoadAuth from './auth/load';
import RequiresAuth from './components/modules/Auth';
import NavBar from './components/modules/NavBar';
import Dashboard from './components/view/Dashboard';
import Posts from './components/view/Posts';
import store from './redux/store';

export default () => {
  LoadAuth();

  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <NavBar />
        <div style={{ paddingTop: `${3.5}em` }} />
        <Route exact path="/" component={Posts} />
        <RequiresAuth exact path="/manage" component={Dashboard} />
      </Router>
    </Provider>,
    document.getElementById('root'),
  );
};
