const dev = ('development' === process.env.NODE_ENV);

const hostname = window && window.location && window.location.hostname || 'localhost';

const PROD_REST = `https://${hostname}`;
const DEV_REST = `http://${hostname}:3000`;
export const APP_URL = dev ? DEV_REST : PROD_REST;
export const API_URL = APP_URL + '/api';
