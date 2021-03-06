import React, { useState } from 'react';
import {
  Accordion, Button, Container, Form,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import PutConfig from '../../axios/Config/PutConfig';
import ConfigCreateOre from './ConfigCreateOre';
import ConfigCreateStone from './ConfigCreateStone';

const Configurator = ({
  mc114,
}) => {
  const [name, setName] = useState('');
  const [oreConfigs, setOreConfigs] = useState([true]);
  const [stoneConfigs, setStoneConfigs] = useState([true]);
  const [oreState, setOreState] = useState([{
    name: '',
    type: 'dense',
    oreBlocks: null,
    sampleBlocks: null,
    maxY: 1,
    minY: 0,
    chance: 0,
    size: 1,
    density: 1,
    dimBlacklist: [],
    blockStateMatchers: [],
  }]);
  const [stoneState, setStoneState] = useState([{
    block: '',
    maxY: -1,
    minY: -1,
    chance: -1,
    size: -1,
    dimBlacklist: [],
  }]);

  const addOreEntry = () => {
    setOreConfigs([...oreConfigs, true]);
  };

  const removeOreEntry = (targetIdx) => {
    const cp = [...oreConfigs];
    cp[targetIdx] = false;
    setOreConfigs(cp);
  };

  const onOreConfigChange = (idx, oreConfigState) => {
    const newState = [...oreState];
    newState[idx] = oreConfigState;
    setOreState(newState);
  };

  const addStoneEntry = () => {
    setStoneConfigs([...stoneConfigs, true]);
  };

  const removeStoneEntry = (targetIdx) => {
    const cp = [...stoneConfigs];
    cp[targetIdx] = false;
    setStoneConfigs(cp);
  };

  const onStoneConfigChange = (idx, stoneConfigState) => {
    const newState = [...stoneState];
    newState[idx] = stoneConfigState;
    setStoneState(newState);
  };

  return (
    <CSSTransition classNames="react-router" appear in timeout={300}>
      <div>
        <div className="text-center d-block">
          <img className="header" src={`${process.env.PUBLIC_URL}/logo.png`} alt="Geolosys Logo" />
          <h4>Geolosys Deposit Configurator</h4>
        </div>

        <Container className="w-50">
          <Form.Group>
            <Form.Label>Config Name:</Form.Label>
            <Form.Control
              type="text"
              name="configName"
              value={name}
              onChange={(evt) => setName(evt.target.value)}
            />
          </Form.Group>
        </Container>
        <Container>
          <h4>Ores</h4>
          <Accordion defaultActiveKey="0">
            {oreConfigs.map((enabled, idx) => enabled && (
              <ConfigCreateOre
                mc114={mc114}
                onEntryCreation={addOreEntry}
                onEntryDeletion={removeOreEntry}
                onConfigChange={onOreConfigChange}
                idx={idx}
              />
            ))}
          </Accordion>
        </Container>

        <Container>
          <h4 className="mt-3">Stones</h4>
          <Accordion defaultActiveKey="0">
            {stoneConfigs.map((enabled, idx) => enabled && (
              <ConfigCreateStone
                mc114={mc114}
                onEntryCreation={addStoneEntry}
                onEntryDeletion={removeStoneEntry}
                onConfigChange={onStoneConfigChange}
                idx={idx}
              />
            ))}
          </Accordion>
        </Container>

        <Button
          onClick={() => PutConfig({
            name,
            json: {
              ores: oreState,
              stones: stoneState,
            },
          }).then((data) => {
            window.location.href = `/view?id=${data}`;
          })}
          className="d-block mx-auto my-4"
        >
          Generate!
        </Button>
      </div>
    </CSSTransition>
  );
};

const mapStateToProps = (state) => ({
  mc114: state.mc114,
});

export default connect(mapStateToProps)(Configurator);
