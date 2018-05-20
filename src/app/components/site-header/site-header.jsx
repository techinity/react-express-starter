/* eslint-disable no-unused-vars,class-methods-use-this */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './site-header.scss';
import logo from './logo.png';

export class SiteHeader extends Component {
  render() {
    return (
      <header>
        <nav>
          <a href="/" className="home-button header-button header-button-small">
            <img src={logo} alt="Site logo"/>
            Header
          </a>
        </nav>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  actions: null,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ }, dispatch),
});

SiteHeader.propTypes = {
  actions: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SiteHeader);
