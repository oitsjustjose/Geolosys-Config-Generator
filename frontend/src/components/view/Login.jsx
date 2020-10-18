import React, { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { CSSTransition } from 'react-transition-group';
import postLogin from '../../axios/Login';
import Notification from '../modules/Notification';

const LoginComponent = ({
  isAuthenticated,
}) => {
  const [state, setState] = useState({
    username: null,
    password: null,
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      window.location.reload();
    }
  }, [isAuthenticated]);

  const submit = (evt) => {
    evt.preventDefault();

    postLogin(state).catch((ex) => {
      setError(`${ex.response.data}`);
    });
  };

  return (
    <CSSTransition classNames="react-router" appear in timeout={300}>
      <div>
        <div className="v-center">
          <Container
            className="mx-auto perfect-width"
          >
            <h2 className="text-center">
              Admin Login
            </h2>
            <Form onSubmit={submit}>
              <Form.Group>
                <Form.Label>
                  Username
                </Form.Label>
                <Form.Control
                  type="text"
                  onChange={(evt) => { setState({ ...state, username: evt.target.value }); }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  Password
                </Form.Label>
                <Form.Control
                  type="password"
                  onChange={(evt) => { setState({ ...state, password: evt.target.value }); }}
                />
              </Form.Group>

              <Button
                type="submit"
              >
                <FontAwesomeIcon icon={faSignInAlt} />
                {' '}
                Log In
              </Button>
            </Form>
          </Container>
        </div>
        <Notification
          title="Failed to Log In"
          contents={error}
          show={!!error}
          onHide={() => setError(null)}
        />
      </div>
    </CSSTransition>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.isAuthenticated,
  user: state.user,
});

export default connect(mapStateToProps)(LoginComponent);
