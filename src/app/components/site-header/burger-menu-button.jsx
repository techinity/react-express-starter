import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';

import './burger-menu-button.scss';

class BurgerMenuButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false);
  }

  handleClick = (event) => {
    event.preventDefault();
    this.toggleMenu(event, false);
    document.removeEventListener('click', this.handleClick, false);
  };

  listenForClick() {
    document.addEventListener('click', this.handleClick, false);
  }

  toggleMenu(event, open) {
    event.preventDefault();
    this.setState({ open }, () => this.listenForClick());
  }

  render() {
    return <Fragment>
      <label
        htmlFor="burger-menu-button__toggle" className="burger-menu-button__label"
        ref={(node) => { this.node = node; }}
        onClick={event => this.toggleMenu(event, !this.state.open)} />
      <input type="checkbox" id="burger-menu-button__toggle" className="burger-menu-button__toggle" checked={this.state.open} />
    </Fragment>;
  }
}

BurgerMenuButton.propTypes = {
  onOpenChange: PropTypes.func,
};

export default BurgerMenuButton;
