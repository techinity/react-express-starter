import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { PageContext } from '../../contexts/page-context/page-context';

export const Body = ({ children }) => <Fragment>
    {children}
    <div id="body-nodes">
      <PageContext.Consumer>
        {context => context.nodes.body}
      </PageContext.Consumer>
    </div>
  </Fragment>;

Body.propTypes = {
  children: PropTypes.node,
};

export default Body;
