import React from 'react';

import Toggle from './components/Toggle';
import Fetch from './components/Fetch';

const url = 'https://jsonplaceholder.typicode.com/comments';

const App = () => (
  <div>
    <h3>Toggle Example</h3>
    <Toggle initial={true}>
      {({ on, toggle }) => (
        <button onClick={toggle}>Button: {on ? 'on' : 'off'}</button>
      )}
    </Toggle>

    <h3>Fetch example</h3>
    <Fetch url={url}>
      {({ loading, result }) =>
        loading ? (
          'Loading...'
        ) : (
          <div>{result.map(item => <div key={item.id}>{item.name}</div>)}</div>
        )
      }
    </Fetch>
  </div>
);
export default App;
