import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Layout from '../layout';
import './home-page.scss';
import { PageContext } from '../../contexts/page-context/page-context';

export const HomePage = () => (
  <PageContext.Consumer>{({ head }) => {
    head(<title>React Express Starter Home Page</title>);

    return <Layout className='home-page page'>
      <h1>React Express Starter</h1>
    </Layout>;
  }}</PageContext.Consumer>
);

HomePage.propTypes = {
  shell: PropTypes.object,
};

/* istanbul ignore next */
const mapStateToProps = () => ({});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
