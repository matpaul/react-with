import React from 'react';
import PropTypes from 'prop-types';

import With from 'react-with';

const componentDidMount = ({ setState, url }) => {
  setState({ loading: true });

  if (!url) {
    return;
  }

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
  </With>
);

Fetch.propTypes = {
  url: PropTypes.string.isRequired,
  children: PropTypes.func
};

export default Fetch;
