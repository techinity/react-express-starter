import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import './error-page.scss';
import Layout from '../layout';

const errors = {
  404: {
    title: 'Page not found',
    desc: 'This page is either no longer available or or the URL has been entered incorrectly.',
  },
};

const displayError = (errorCode) => {
  const error = errors[errorCode.toString()];

  return (
    <Fragment>
      <h1>{error.title}</h1>
      <div>{error.desc}</div>
    </Fragment>
  );
};

export const ErrorPage = () => (
  <Layout className="error-page page">{displayError(404)}</Layout>
);

export default connect()(ErrorPage);
