import React, { useState } from 'react';
import {
  Button, Form, InputGroup, OverlayTrigger, Tooltip,
} from 'react-bootstrap';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default ({
  onChangeSuper,
}) => {
  const [entries, setEntries] = useState([true]);
  const [biomes, setBiomes] = useState([null]);
  const [isWhitelist, setWlMode] = useState(false);

  const addEntry = () => {
    const newBiomes = [...biomes, null];
    setBiomes(newBiomes);
    setEntries([...entries, true]);
    onChangeSuper({
      isWhitelist,
      biomes: newBiomes,
    });
  };

  const removeEntry = (targetIdx) => {
    const newEntries = [...entries];
    newEntries[targetIdx] = false;
    setEntries(newEntries);
    onChangeSuper({
      isWhitelist,
      biomes: biomes.filter((_, i) => entries[i] === true),
    });
  };

  const onChange = (idx, value) => {
    const newBiomes = [...biomes];
    newBiomes[idx] = value;
    setBiomes(newBiomes);
    onChangeSuper({
      isWhitelist,
      biomes: newBiomes,
    });
  };

  const onWlChange = (value) => {
    setWlMode(value);
    onChangeSuper({
      isWhitelist: value,
      biomes,
    });
  };

  return entries.map((enabled, idx) => enabled && (
    <Form.Group>
      <InputGroup>
        <OverlayTrigger
          placement="top"
          overlay={(
            <Tooltip id={`biome-input-${idx}`}>
              {'Format: <modid:biome> OR '}

              <a rel="noreferrer noopener" href="https://oitsjustjo.se/u/GelX-uC1s" target="_blank">
                Biome Type
              </a>
            </Tooltip>
          )}
        >
          <Form.Control
            required
            type="text"
            onChange={(evt) => onChange(idx, evt.target.value)}
          />
        </OverlayTrigger>

        {idx === 0 && (
          <InputGroup.Append>
            <InputGroup.Text>
              Whitelist?
            </InputGroup.Text>
            <InputGroup.Checkbox
              onChange={(evt) => onWlChange(evt.target.checked)}
              aria-label="Checkbox for following text input"
            />
          </InputGroup.Append>
        )}
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
