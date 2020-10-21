import React, { useState } from 'react';
import { Accordion, Container, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import ConfigRenderOre from './ConfigRenderOre';
import ConfigRenderStone from './ConfigRenderStone';
import PostGenerateJson from '../../axios/Generate';

const Configurator = ({
  mc114,
}) => {
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
    console.log('Ore State Change', idx, oreConfigState);
    console.log(newState);
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
    console.log('Stone State Change', idx, stoneConfigState);
    console.log(newState);
    setStoneState(newState);
  };

  return (
    <div>
      <div className="text-center d-block">
        <img className="header" src={`${process.env.PUBLIC_URL}/logo.png`} alt="Geolosys Logo" />
        <h4>Geolosys Deposit Configurator</h4>
      </div>

      <Container>
        <h4>Ores</h4>
        <Accordion defaultActiveKey="0">
          {oreConfigs.map((enabled, idx) => enabled && (
            <ConfigRenderOre
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
        <h4>Stones</h4>
        <Accordion defaultActiveKey="0">
          {stoneConfigs.map((enabled, idx) => enabled && (
            <ConfigRenderStone
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
        onClick={() => PostGenerateJson({
          ores: oreState,
          stones: stoneState,
        })}
        className="d-block mx-auto my-4"
      >
        Generate!
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  mc114: state.mc114,
});

export default connect(mapStateToProps)(Configurator);
