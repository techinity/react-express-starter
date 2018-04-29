/* eslint-disable no-unused-vars,class-methods-use-this */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './header.scss';

export class Header extends Component {
  render() {
    return (
      <header>
        <nav>
          <a href="/" className="home-button header-button header-button-small">
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

Header.propTypes = {
  actions: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
