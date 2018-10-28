# react-with

⚡️Awesome render props components creation

[![NPM](https://img.shields.io/npm/v/react-with.svg)](https://www.npmjs.com/package/react-with)

Features
 - simple api
 - lifecycle support

## Install
```bash
yarn add react-with --dev
or
npm install --save react-with
```

## Usage
Consider Toggle component example
```jsx
import React from 'react';
import With from 'react-with';

const onToggle = ({ state, setState }, event) =>
  setState(prevState => ({ on: !prevState.on }));

const Toggle = ({ children, initial }) => (
  <With state={{ on: initial }} toggle={onToggle}>
  {({ on, toggle }) => (
    <button onClick={toggle}>Button: {on ? 'on' : 'off'}</button>
  )}
  </With>
);

```

Props:

*state* - initial state object


*lifecycle* - object with React lifecycle hooks (componentDidMount, componentWillUnmount, etc) (see Fetch example)


*render* - if there is a necessity to use instead of children function

Each function passed to With Component receives *self* as a first argument.

*self* is an object and contains current state, setState, and other passed props to With component

## Examples
#### Toggle
```jsx
import React from 'react';

import With from 'react-with';

const onToggle = ({ state, setState }) =>
  setState(prevState => ({ on: !prevState.on }));

const Toggle = ({ children, initial }) => (
  <With state={{ on: initial }} toggle={onToggle}>
  {children}
  </With>
);

// use
<Toggle>
  {({ on, toggle }) => (
    <button onClick={toggle}>Button: {on ? 'on' : 'off'}</button>
  )}
</Toggle>


```

#### Fetch

```jsx
import React from 'react';
import PropTypes from 'prop-types';

import With from 'react-with';

const componentDidMount = ({ setState, url }) => {
  setState({ loading: true });

  fetch(url)
    .then(response => response.json())
    .then(json =>
      setState({
        result: json,
        loading: false
      })
    );
};

const Fetch = ({ url, children, render }) => (
  <With
    url={url}
    state={{ result: [], loading: false }}
    lifecycle={{
      componentDidMount
  }}
    render={render}
  >
  {children}
  </With>);

// use
const url = 'https://jsonplaceholder.typicode.com/comments';
<Fetch url={url}>
  {({ loading, result }) =>
    loading ? (
      'Loading...'
    ) : (
      <div>{result.map(item => (
        <div key={item.id}>{item.name}</div>)
      )}</div>
    )
  }
</Fetch>
```

## License

MIT © [matpaul](https://github.com/matpaul)
