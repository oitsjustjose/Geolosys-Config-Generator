import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import {
  Accordion, Button, ButtonGroup, Card, Form,
} from 'react-bootstrap';
import ExtendableInput from '../modules/Config/ExtendableInput';

export default ({
  mc114, idx, onEntryCreation, onEntryDeletion, onConfigChange, prefill,
}) => {
  const [state, setState] = useState(prefill || {
    block: '',
    maxY: 1,
    minY: 0,
    chance: 0,
    size: 1,
    dimBlacklist: [],
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
                Stone Block
              </Form.Label>

              <Form.Control
                required
                value={state.block}
                onChange={(evt) => setStateWithPropogation({ ...state, block: evt.target.value })}
                type="text"
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
                Dimension Blacklist
              </Form.Label>

              <ExtendableInput
                type={mc114 ? 'text' : 'number'}
                tooltipText={mc114 ? 'Format: <modid:dimension>' : 'Any Dimension ID (e.g. -1, 1)'}
                prefill={prefill && prefill.dimBlacklist}
                onChangeSuper={(dimBlacklist) => setStateWithPropogation(
                  { ...state, dimBlacklist },
                )}
              />
            </Form.Group>
          </Form>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};
