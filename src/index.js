import React from 'react';
import PropTypes from 'prop-types';

import { isFn } from './utils';

const { shape, func, object } = PropTypes;

class With extends React.Component {
  static defaultProps = {
    state: {},
    lifecycle: {}
  };

  static propTypes = {
    state: object,
    render: func,
    children: func,
    lifecycle: shape({
      componentDidMount: func,
      componentWillUnmount: func,
      shouldComponentUpdate: func,
      componentDidUpdate: func,
      componentDidCatch: func
    })
  };

  static hooks = [
    'componentDidMount',
    'componentWillUnmount',
    'shouldComponentUpdate',
    'componentDidUpdate',
    'componentDidCatch'
  ];

  set = (...args) => this.setState(...args);

  constructor(props) {
    super(props);

    const { state, lifecycle, children, ...other } = props;

    this.state = state;
    this.fns = [];

    Object.keys(other)
      .map(name => [name, other[name]]) // entries need polyfill
      .filter(([name, value]) => isFn(value))
      .forEach(([name, fn]) => {
        this.fns[name] = (...args) => {
          return fn(
            { ...props, state: this.state, setState: this.set, ...this.fns },
            ...args
          );
        };
      });

    With.hooks.forEach(name => {
      const hook = lifecycle[name];

      if (isFn(hook)) {
        this[name] = (...args) => {
          hook(
            { ...other, setState: this.set, state: this.state, ...this.fns },
            args
          );
        };
      }
    });
  }

  render() {
    const { children, render } = this.props;

    const args = { ...this.state, ...this.fns };

    const renderTo = isFn(children) ? children : render;

    return renderTo(args);
  }
}

export default With;
