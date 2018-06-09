import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import './error-page.scss';
import Layout from '../layout';
import { PageContext } from '../../contexts/page-context/page-context';

const errors = {
  404: {
    title: 'Page not found',
    desc: 'This page is either no longer available or or the URL has been entered incorrectly.',
  },
  500: {
    title: 'Server error',
    desc: 'There was a problem processing your request.',
  },
};

export const ErrorPage = ({ server }) => {
  const { error } = server;
  const responseStatus = error ? 500 : 404;
  const mappedError = errors[responseStatus];
  const errorMessage = error ? error.message : mappedError.title;
  const errorStack = error ? error.stack : null;

  return (
    <Layout className="error-page page">
      <PageContext.Consumer>{({ head, statusCode }) => {
        head(<title>{mappedError.title}</title>);
        statusCode(responseStatus);
      }}</PageContext.Consumer>

      <h1>{errorMessage}</h1>
      <div>{errorStack}</div>
    </Layout>
  );
};

ErrorPage.defaultProps = {
  server: {},
};

ErrorPage.propTypes = {
  server: PropTypes.object,
};

/* istanbul ignore next */
const mapStateToProps = ({ server }) => ({
  server,
});


export default connect(mapStateToProps)(ErrorPage);
