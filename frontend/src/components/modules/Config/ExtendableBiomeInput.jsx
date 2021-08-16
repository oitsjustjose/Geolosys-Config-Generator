import React, { useState } from 'react';
import {
  Button, Form, InputGroup, OverlayTrigger, Tooltip,
} from 'react-bootstrap';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default ({
  onChangeSuper, prefill,
}) => {
  const [entries, setEntries] = useState(
    (prefill && Array(prefill.biomes.length).fill(true)) || [true],
  );
  const [biomes, setBiomes] = useState((prefill && prefill.biomes) || [null]);
  const [isWhitelist, setWlMode] = useState((prefill && prefill.isWhitelist) || false);

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
              <a
                rel="noreferrer noopener"
                href="https://skmedix.github.io/ForgeJavaDocs/javadoc/forge/1.9.4-12.17.0.2051/net/minecraftforge/common/BiomeDictionary.Type.html"
                target="_blank"
              >
                Biome Type
              </a>
            </Tooltip>
          )}
        >
          <Form.Control
            required
            type="text"
            value={biomes[idx]}
            onChange={(evt) => onChange(idx, evt.target.value)}
          />
        </OverlayTrigger>

        {idx === 0 && (
          <InputGroup.Append>
            <InputGroup.Text>
              Whitelist?
            </InputGroup.Text>
            <InputGroup.Checkbox
              checked={isWhitelist}
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
