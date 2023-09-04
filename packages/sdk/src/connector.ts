import { client } from './client';
import { Options } from './types';
import * as methods from './methods/index';
import { prepareFragments } from './fragments';

/**
 * Connector methods.
 */
type Methods = typeof methods;

/**
 * Initialize the Boilerplate connector.
 */
export const shopifyConnector = (options: Options): Methods => {
  client.defaults.baseURL = options.apiUrl;
  prepareFragments(options.fragments);

  return methods;
};
