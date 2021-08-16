import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import store from '../../redux/store';

export default () => {
  const mc114Mode = store.getState().mc114;
  const [show, setShow] = useState(mc114Mode && !JSON.parse(window.localStorage.getItem('hasSeenDatapackWarning')));
  const onClose = () => {
    window.localStorage.setItem('hasSeenDatapackWarning', true);
    document.body.removeAttribute('style');
    setShow(false);
  };

  if (show) {
    document.body.style.overflow = 'hidden';
  }

  return (show && (
    <div className="fullpage warning">
      <h2>A Note on 1.16</h2>
      <p>
        Since you are on MC 1.14+ mode, there&apos;s a chance that you are using
        Minecraft 1.16 or above. In 1.16 and above Geolosys has been changed
        to use datapacks, so this configurator
        {' '}
        <b>will not work.</b>
      </p>
      <p>
        Data for deposits go in
        {' '}
        <code>/data/geolosys/deposits</code>
        . If you wish to override a built-in Geolosys data pack see the data schema
        {' '}
        <a href="https://mods.oitsjustjose.com/Geolosys/#datapacks" target="_blank" rel="noreferrer noopener">
          here.
        </a>
      </p>
      <p>
        You will only see this message once per browser
      </p>
      <Button onClick={onClose}>
        Dismiss
      </Button>
    </div>
  )) || <div />;
};
