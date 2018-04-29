/*
 * File         :   history.js
 * Description  :   Browser History.
 * -------------------------------------------------------------------------------------------------------------------------------------- */
import createHistory from 'history/createBrowserHistory';

// Create a history of your choosing (we're using a browser history in this case)
const history = typeof window === 'undefined' ? {} : createHistory();

export default history;
