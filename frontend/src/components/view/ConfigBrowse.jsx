import React from 'react';
import { connect } from 'react-redux';
import { Table, Container } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import GetConfigs from '../../axios/Config/GetConfigs';

const ConfigViewComponent = ({
  configs,
}) => {
  if (!Array.isArray(configs)) {
    GetConfigs();
    return (
      <CSSTransition classNames="react-router" appear in timeout={300}>
        <div className="v-center"><h1>Loading...</h1></div>
      </CSSTransition>
    );
  }

  if (!configs.length) {
    return (
      <CSSTransition classNames="react-router" appear in timeout={300}>
        <div className="v-center">
          <h1>
            No Configs Found
            {' '}
            <span role="img" aria-label="frown-emoji">🙁</span>
          </h1>
        </div>
      </CSSTransition>
    );
  }

  return (
    <CSSTransition classNames="react-router" appear in timeout={300}>
      <div>
        <h2 className="text-center mt-3">Your Configs</h2>
        <Container className="perfect-width">
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>URL</th>
              </tr>
            </thead>
            <tbody>
              {configs.map((slug, idx) => (
                <tr>
                  <td>{idx + 1}</td>
                  <td><a href={`/?id=${slug}`}>{slug}</a></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
    </CSSTransition>
  );
};

const mapStateToProps = (state) => ({
  configs: state.configs,
});

export default connect(mapStateToProps)(ConfigViewComponent);
