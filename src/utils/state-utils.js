import atob from 'atob';
import btoa from 'btoa';

/**
 * Serializes a state object to string.
 * @param state
 */
export function serializeState(state) {
  return (state && btoa(JSON.stringify(state))) || '';
}

/**
 * Deserialize text into an object
 * @param text
 */
export function deserializeState(text) {
  return (text && JSON.parse(atob(text.toString()))) || {};
}
