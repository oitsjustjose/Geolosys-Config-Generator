import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoadAuth from './auth/load';
import NavBar from './components/modules/NavBar';
import ConfigBrowse from './components/view/ConfigBrowse';
import ConfigCreate from './components/view/ConfigCreate';
import ConfigRender from './components/view/ConfigRender';
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
        <Route exact path="/" component={() => <ConfigCreate editing={false} />} />
        <Route exact path="/edit" component={() => <ConfigCreate editing />} />
        <Route exact path="/view" component={ConfigRender} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/browse" component={ConfigBrowse} />
        <Route exact path="/register" component={Register} />
      </Router>
    </Provider>,
    document.getElementById('root'),
  );
};
