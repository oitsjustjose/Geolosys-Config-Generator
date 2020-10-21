import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import {
  Button, Form, InputGroup, OverlayTrigger, Tooltip,
} from 'react-bootstrap';

export default ({
  prefix, singular, onChangeSuper,
}) => {
  const [entries, setEntries] = useState([true]);
  const [state, setState] = useState([{
    ore: '',
    chance: 100,
  }]);

  const changePostEvt = (update) => {
    onChangeSuper(update.filter((_, i) => entries[i] === true));
  };

  const addEntry = () => {
    if (!singular) {
      const newState = [...state, { ore: '', chance: 100 }];
      setState(newState);
      changePostEvt(newState);
      setEntries([...entries, true]);
    }
  };

  const removeEntry = (targetIdx) => {
    if (!singular) {
      const newEntries = [...entries];
      newEntries[targetIdx] = false;
      changePostEvt(state);
      setEntries(newEntries);
    }
  };

  const onChange = (idx, key, value) => {
    const newState = [...state];
    newState[idx] = {
      ...newState[idx],
      [key]: value,
    };

    setState(newState);
    changePostEvt(newState);
  };

  return (singular ? [entries[0]] : entries).map((enabled, idx) => enabled && (
    <Form.Group>
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text>Block and Chance</InputGroup.Text>
        </InputGroup.Prepend>

        <OverlayTrigger
          placement="top"
          overlay={(
            <Tooltip id={`tooltip-block-${prefix}-${idx}`}>
              Format: modid:block or modid:block:meta
            </Tooltip>
          )}
        >
          <Form.Control
            required
            type="text"
            value={state[idx].ore}
            onChange={(evt) => onChange(idx, 'ore', evt.target.value)}
          />
        </OverlayTrigger>

        <OverlayTrigger
          placement="top"
          overlay={(
            <Tooltip id={`tooltip-chance-${prefix}-${idx}`}>
              All Chances
              {' '}
              <strong>MUST</strong>
              {' '}
              Add To 100
            </Tooltip>
          )}
        >
          <Form.Control
            required
            type="number"
            min="1"
            max="100"
            value={(singular && 100) || state[idx].chance}
            disabled={singular}
            onChange={(evt) => onChange(idx, 'chance', parseInt(evt.target.value, 10))}
          />
        </OverlayTrigger>

        {!singular && (
          <InputGroup.Append>
            <Button variant="success" onClick={addEntry}>
              <FontAwesomeIcon icon={faPlus} />
            </Button>

            {idx !== 0 && (
              <Button variant="danger" onClick={() => removeEntry(idx)}>
                <FontAwesomeIcon icon={faMinus} />
              </Button>
            )}
          </InputGroup.Append>
        )}
      </InputGroup>
    </Form.Group>
  ));
};
