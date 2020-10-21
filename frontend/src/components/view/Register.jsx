import React, { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { CSSTransition } from 'react-transition-group';
import postRegister from '../../axios/Register';
import Notification from '../modules/Notification';

const LoginComponent = ({
  isAuthenticated,
}) => {
  const [state, setState] = useState({
    username: null,
    password: null,
    passwordConf: null,
    usernameDup: false,
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = '/';
    }
  }, [isAuthenticated]);

  const submit = (evt) => {
    evt.preventDefault();

    if (state.password === state.passwordConf) {
      const { username, password } = state;

      postRegister({ username, password }).catch((ex) => {
        if (ex.response && ex.response.data === 'USERNAME ALREADY EXISTS') {
          setState({ ...state, usernameDup: true });
        } else {
          setError(`${ex.response.data}`);
        }
      });
    }
  };

  return (
    <CSSTransition classNames="react-router" appear in timeout={300}>
      <div>
        <div className="v-center">
          <Container className="mx-auto perfect-width">
            <h2 className="text-center">
              New User Registration
            </h2>

            <Form onSubmit={submit}>
              <Form.Group>
                <Form.Label>
                  Username
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  onChange={(evt) => { setState({ ...state, username: evt.target.value }); }}
                />
                {state.usernameDup && (
                <Form.Text className="text-danger">Username Already Exists</Form.Text>
                )}
              </Form.Group>

              <Form.Group>
                <Form.Label>
                  Password
                </Form.Label>
                <Form.Control
                  required
                  type="password"
                  onChange={(evt) => { setState({ ...state, password: evt.target.value }); }}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>
                  (Confirm)
                </Form.Label>
                <Form.Control
                  required
                  type="password"
                  onChange={(evt) => { setState({ ...state, passwordConf: evt.target.value }); }}
                />
                {state.password !== state.passwordConf && (
                <Form.Text className="text-danger">Passwords Do Not Match</Form.Text>
                )}
              </Form.Group>

              <Button type="submit" disabled={!(!!state.username && !!state.password && state.password === state.passwordConf)}>
                <FontAwesomeIcon icon={faSignInAlt} />
                {' '}
                Register
              </Button>
            </Form>
          </Container>
        </div>
        <Notification
          title="Failed to Register"
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
