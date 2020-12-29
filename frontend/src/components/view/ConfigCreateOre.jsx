import React, { useState } from 'react';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Accordion, Button, ButtonGroup, Card, Form, OverlayTrigger, Tooltip,
} from 'react-bootstrap';
import WeightedTextEntry from '../modules/Config/WeightedTextEntry';
import ExtendableInput from '../modules/Config/ExtendableInput';
import ExtendableBiomeInput from '../modules/Config/ExtendableBiomeInput';

export default ({
  mc114, idx, onEntryCreation, onEntryDeletion, onConfigChange, prefill,
}) => {
  const [state, setState] = useState(prefill || {
    name: '',
    depType: 'deposit',
    type: 'dense',
    oreBlocks: null, // string or string[] depending on type
    sampleBlocks: null, // string or string[] depending on type
    maxY: 1,
    minY: 0,
    chance: 0,
    size: 1,
    density: 1,
    dimBlacklist: [],
    blockStateMatchers: [], // string[]
  });

  const setStateWithPropogation = (newState) => {
    setState(newState);
    onConfigChange(idx, newState);
  };

  return (
    <Card>
      <Card.Header>
        <ButtonGroup>
          <Accordion.Toggle as={Button} variant="outline-secondary" eventKey={`${idx}`}>
            Config Entry
          </Accordion.Toggle>

          <Button variant="success" onClick={onEntryCreation}>
            <FontAwesomeIcon icon={faPlus} />
          </Button>

          {idx !== 0 && (
            <Button variant="danger" onClick={() => onEntryDeletion(idx)}>
              <FontAwesomeIcon icon={faMinus} />
            </Button>
          )}
        </ButtonGroup>
      </Card.Header>
      <Accordion.Collapse eventKey={`${idx}`}>
        <Card.Body>
          <Form style={{ padding: '12px' }} onSubmit={null}>
            <Form.Group>
              <Form.Label>
                Deposit Name [Optional]
              </Form.Label>
              <Form.Control
                type="text"
                onChange={(evt) => {
                  setStateWithPropogation(
                    { ...state, name: evt.target.value },
                  );
                }}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>
                Deposit Type
              </Form.Label>

              <Form.Control
                as="select"
                value={state.depType}
                onChange={(evt) => setStateWithPropogation(
                  { ...state, depType: evt.target.value },
                )}
              >
                <option value="deposit">Normal</option>
                <option value="depositMulti">Multi-Ore</option>
                <option value="depositBiome">Biome Specific</option>
                <option value="depositBiomeMulti">Multi-Ore &amp; Biome Specific</option>
              </Form.Control>
            </Form.Group>

            {mc114 && (
              <Form.Group>
                <Form.Label>
                  Deposit Structure Type (
                  <b>1.14+ Only</b>
                  )
                </Form.Label>

                <Form.Control
                  as="select"
                  value={state.type}
                  onChange={(evt) => setStateWithPropogation(
                    { ...state, type: evt.target.value },
                  )}
                >
                  <option value="dense">Dense</option>
                  <option value="sparse">Sparse</option>
                  <option value="dike">Dike</option>
                  <option value="layer">Layer</option>
                </Form.Control>
              </Form.Group>
            )}

            <Form.Group>
              <Form.Label>
                Ore Blocks
              </Form.Label>

              <WeightedTextEntry
                singular={!state.depType.toLowerCase().includes('multi')}
                prefix="ore"
                prefill={prefill && prefill.oreBlocks}
                onChangeSuper={(oreBlocks) => {
                  setStateWithPropogation({ ...state, oreBlocks });
                }}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>
                Sample Blocks
              </Form.Label>

              <WeightedTextEntry
                singular={!state.depType.toLowerCase().includes('multi')}
                prefix="sample"
                prefill={prefill && prefill.sampleBlocks}
                onChangeSuper={(sampleBlocks) => {
                  setStateWithPropogation({ ...state, sampleBlocks });
                }}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>
                Maximum Y-Level
              </Form.Label>

              <Form.Control
                required
                type="number"
                value={state.maxY}
                min={1}
                max={255}
                onChange={(evt) => {
                  const maxY = (state.maxY < state.minY)
                    ? state.minY + 1
                    : parseInt(evt.target.value, 10);
                  setStateWithPropogation({ ...state, maxY });
                }}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>
                Minimum Y-Level
              </Form.Label>

              <Form.Control
                required
                type="number"
                value={state.minY}
                min={0}
                max={254}
                onChange={(evt) => {
                  const minY = (state.minY > state.maxY)
                    ? state.maxY - 1
                    : parseInt(evt.target.value, 10);
                  setStateWithPropogation({ ...state, minY });
                }}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>
                Chance (
                <a rel="noreferrer noopener" target="_blank" href="https://oitsjustjo.se/u/M3NfQxBsZ">Relative To All Chances</a>
                {' '}
                )
              </Form.Label>

              <Form.Control
                required
                type="number"
                value={state.chance}
                min={0}
                onChange={(evt) => setStateWithPropogation(
                  { ...state, chance: parseInt(evt.target.value, 10) },
                )}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>
                Size
              </Form.Label>

              <Form.Control
                required
                type="number"
                value={state.size}
                min={1}
                onChange={(evt) => setStateWithPropogation(
                  { ...state, size: parseInt(evt.target.value, 10) },
                )}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>
                Density
              </Form.Label>

              <OverlayTrigger
                placement="top"
                overlay={(
                  <Tooltip id={`density-${idx}`}>
                    Any Decimal Between 0 and 1
                  </Tooltip>
                )}
              >
                <Form.Control
                  required
                  type="number"
                  value={state.density}
                  onChange={(evt) => {
                    if (evt.target.value > 1) {
                      setStateWithPropogation(
                        { ...state, density: 1 },
                      );
                    } else if (evt.target.value < 0) {
                      setStateWithPropogation(
                        { ...state, density: 0 },
                      );
                    } else {
                      setStateWithPropogation(
                        { ...state, density: Number(evt.target.value) },
                      );
                    }
                  }}
                />
              </OverlayTrigger>
            </Form.Group>

            {state.depType.toLowerCase().includes('biome') && (
              <Form.Group>
                <Form.Label>
                  Biomes To Spawn / Not Spawn
                </Form.Label>
                <ExtendableBiomeInput onChangeSuper={(wlState) => setStateWithPropogation({
                  ...state,
                  ...wlState,
                })}
                />
              </Form.Group>
            )}

            <Form.Group>
              <Form.Label>
                Dimension Blacklist
              </Form.Label>

              <ExtendableInput
                type={mc114 ? 'text' : 'number'}
                tooltipText={mc114 ? 'Format: <modid:dimension>' : 'Any Dimension ID (e.g. -1, 1)'}
                onChangeSuper={(dimBlacklist) => setStateWithPropogation(
                  { ...state, dimBlacklist },
                )}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>
                Blocks This Deposit May Replace
              </Form.Label>

              <ExtendableInput
                type="text"
                tooltipText="Format: <modid:block> or <modid:block:meta>"
                onChangeSuper={(blockStateMatchers) => setStateWithPropogation(
                  { ...state, blockStateMatchers },
                )}
              />
            </Form.Group>
          </Form>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};
