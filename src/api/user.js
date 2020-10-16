import makeRequest from './base';


const doLogin = (data) => makeRequest('login', data);

const getSession = () => makeRequest('session');

const getOrganization = () => makeRequest('organization');

const doLogout = () => makeRequest('logout');


export default {
    doLogin,
    getSession,
    getOrganization,
    doLogout,
};
