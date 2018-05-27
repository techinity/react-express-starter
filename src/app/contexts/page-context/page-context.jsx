import React from 'react';
import { Bridge } from './bridge';
import { DOMBridge } from './dom-bridge';
import { isNode } from '../../../utils/environment-utils';

const createBridge = context => (isNode() ? new Bridge(context) : new DOMBridge(context || window));

export const PageContext = React.createContext(createBridge());
PageContext.bridge = createBridge;
