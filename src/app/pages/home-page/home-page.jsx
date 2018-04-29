import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Layout from '../layout';
import './home-page.scss';

export const HomePage = () => (<Layout className='home-page page'>
  <h1>React Express Starter</h1>
</Layout>);

HomePage.propTypes = {};

/* istanbul ignore next */
const mapStateToProps = () => ({});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
