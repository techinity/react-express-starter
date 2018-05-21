/* eslint-disable class-methods-use-this */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './site-header.scss';
import BurgerMenuButton from './burger-menu-button';
import logo from './logo.png';

export class SiteHeader extends Component {
  render() {
    return (
      <header className="site-header">
        <nav>
          <Link to="/" className="site-header__header-logo">
            <img src={logo} alt="Site logo" className="site-header__image-logo"/>
            Header
          </Link>
        </nav>

        <BurgerMenuButton />
        <nav className="site-header__menu-nav">
          <Link to="/about">About</Link>
        </nav>
      </header>
    );
  }
}

const mapStateToProps = () => ({
  actions: null,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ }, dispatch),
});

SiteHeader.propTypes = {
  actions: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SiteHeader);
