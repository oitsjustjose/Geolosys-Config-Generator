import React, { useState } from 'react';
import {
  Button, Form, InputGroup, OverlayTrigger, Tooltip,
} from 'react-bootstrap';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default ({
  type, tooltipText, onChangeSuper, prefill,
}) => {
  const [entries, setEntries] = useState((prefill && Array(prefill.length).fill(true)) || [true]);
  const [state, setState] = useState(prefill || [null]);

  const addEntry = () => {
    const newState = [...state, null];
    setState(newState);
    onChangeSuper(newState);
    setEntries([...entries, true]);
  };

  const removeEntry = (targetIdx) => {
    const newEntries = [...entries];
    newEntries[targetIdx] = false;
    onChangeSuper(state.filter((_, i) => entries[i] === true));
    setEntries(newEntries);
  };

  const onChange = (idx, value) => {
    const newState = [...state];
    newState[idx] = value;
    setState(newState);
    onChangeSuper(newState);
  };

  return entries.map((enabled, idx) => enabled && (
    <Form.Group>
      <InputGroup>
        <OverlayTrigger
          placement="top"
          overlay={(
            <Tooltip id={`${tooltipText}-${idx}`}>
              {tooltipText}
            </Tooltip>
          )}
        >
          <Form.Control
            required
            type={type}
            value={state[idx]}
            onChange={(evt) => onChange(idx, evt.target.value)}
          />
        </OverlayTrigger>

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
      </InputGroup>
    </Form.Group>
  ));
};
