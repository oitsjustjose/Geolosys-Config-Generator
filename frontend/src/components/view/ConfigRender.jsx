import React from 'react';
import { Container } from 'react-bootstrap';

export default ({
  jsonData,
}) => (
  <div>
    <h2 className="text-center mt-3">Config View</h2>
    <Container className="shadow mt-5">
      <pre>
        {JSON.stringify(jsonData.json, null, 2) }
      </pre>
    </Container>
  </div>
);
