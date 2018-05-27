import PropTypes from 'prop-types';
import React from 'react';
import { PageContext } from '../../contexts/page-context/page-context';

export const Head = () =>
  <head>
    <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
    <meta charSet="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

    <PageContext.Consumer>
      {context => context.nodes.head}
    </PageContext.Consumer>
  </head>;

Head.propTypes = {
  fragment: PropTypes.bool,
};

export default Head;
