import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './layout.scss';
import SiteFooter from '../components/site-footer/site-footer';
import Header from '../components/site-header/site-header';
import { windowResize } from '../redux/actions/ui/ui-actions';

export class Layout extends Component {
  render() {
    return (
      <div className="layout">
        <Header />
        <main className="main-content">
          <div className={this.props.className}>
            {this.props.children}
          </div>
        </main>

        <SiteFooter />
      </div>
    );
  }
}

Layout.propTypes = {
  actions: PropTypes.object,
  children: PropTypes.any,
  className: PropTypes.string,
};

Layout.defaultProps = {
  actions: {},
  children: [],
  className: '',
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    windowResize,
  }, dispatch),
});

const mapStateToProps = state => ({
  windowHeight: state.ui.windowHeight,
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
