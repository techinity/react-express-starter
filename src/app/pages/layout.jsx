/* eslint-disable import/no-named-as-default,no-unused-vars */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './layout.scss';
import Footer from '../components/footer/footer';
import Header from '../components/site-header/site-header';
import { windowResize } from '../redux/actions/ui/ui-actions';

export class Layout extends Component {
  constructor(props) {
    super(props);

    this.resizeHandler = () => {
      this.props.actions.windowResize();
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeHandler, false);
  }

  componentDidUpdate() {
    if (this.props.loading) {
      document.body.classList.add('network-loading');
    } else {
      document.body.classList.remove('network-loading');
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler, false);
  }

  render() {
    return (
      <div className="layout">
        <Header />
        <main className="main-content">
          <div className={this.props.className}>
            {this.props.children}
          </div>
        </main>

        {!this.props.hideFooter ? <Footer /> : null}
      </div>
    );
  }
}

Layout.propTypes = {
  actions: PropTypes.object,
  children: PropTypes.any,
  className: PropTypes.string,
  hideFooter: PropTypes.bool,
  loading: PropTypes.bool,
  windowHeight: PropTypes.number,
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
