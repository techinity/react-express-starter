import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Head from '../../app/components/head/head';
import Body from '../../app/components/body/body';

export class Html extends Component {
  render() {
    const {
      children,
      markup,
    } = this.props;

    return <html>
      <Head />
      <Body>
        <div id="app" dangerouslySetInnerHTML={{ __html: markup }} />
        {children}
      </Body>
    </html>;
  }
}

Html.propTypes = {
  children: PropTypes.node,
  markup: PropTypes.string,
};

Html.defaultProps = {
};

export default Html;
