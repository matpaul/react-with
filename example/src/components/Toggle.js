import React from 'react';
import PropTypes from 'prop-types';

import With from 'react-with';

const onToggle = ({ state, setState }) =>
  setState(state => ({ on: !state.on }));

const Toggle = ({ children, initial }) => (
  <With state={{ on: initial }} toggle={onToggle}>
    {children}
  </With>
);

Toggle.defaultProps = {
  initial: false
};

Toggle.propTypes = {
  children: PropTypes.func,
  initial: PropTypes.bool
};

export default Toggle;
