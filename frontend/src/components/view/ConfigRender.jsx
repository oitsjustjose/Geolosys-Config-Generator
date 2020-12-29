import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import GetConfig from '../../axios/Config/GetConfig';

const cleanJson = (json) => {
  const formatted = { ...json.ores };
  if (formatted.oreBlocks) {
    formatted.oreBlocks = formatted.oreBlocks.map((x) => [x.ore, x.chance]).flat();
  }
  if (formatted.sampleBlocks) {
    formatted.sampleBlocks = formatted.sampleBlocks.map((x) => [x.ore, x.chance]).flat();
  }

  delete formatted.depType;

  return {
    ores: formatted,
    stones: json.stones,
  };
};

export default () => {
  const [json, setJson] = useState(null);
  const params = new URLSearchParams(window.location.search);

  if (!json) {
    if (params.has('id')) {
      GetConfig(params.get('id')).then((data) => (
        setJson(data)
      ));
      return (
        <CSSTransition classNames="react-router" appear in timeout={300}>
          <div className="v-center"><h1>Loading...</h1></div>
        </CSSTransition>
      );
    }
    return (
      <CSSTransition classNames="react-router" appear in timeout={300}>
        <div className="v-center text-danger">
          <h3>
            Missing Query Param
            {' '}
            <code>id</code>
          </h3>
        </div>
      </CSSTransition>
    );
  }

  return (
    <div>
      <h2 className="text-center mt-3">{`Viewing Config ${json.name}`}</h2>
      <Container className="shadow mt-5">
        <pre>
          {JSON.stringify(cleanJson(json.json), null, 2)}
        </pre>
      </Container>
    </div>
  );
};
