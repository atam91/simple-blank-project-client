import localStorage from './localStorage';
import logger from './logger';
import PendingContainer from '../utils/PendingContainer';

const TOKEN = 'sid';

////  INIT SESSION ////
let token = localStorage.getItem(TOKEN);
logger.log('Token from localStorage:', token);

const authing = PendingContainer();
token && authing.startPending();

const initStorePlugin = (store) => {
    return setTimeout(() => {                                   //// FIXME !!! THIS IS BAD PRACTICE !!!
        token && store.dispatch('session')
            .finally(() => authing.finishPending());
    });

    /**token && store.dispatch('session')
        .finally(() => authing.finishPending());**/
};

const isAuth = () => !!token;

const getToken = () => token;

const setToken = (_token) => {
    logger.log('Set Token', _token);
    token = _token;
    localStorage.setItem(TOKEN, token);
};

const dropToken = () => {
    token = null;
    localStorage.removeItem(TOKEN);
    logger.log('Drop token from localStorage.');
};


export default {
    initStorePlugin,
    isAuth,
    getToken,
    setToken,
    dropToken,
    isAuthing: authing.isPending,
    addAfterAuthJob: authing.addAfterPendingJob,
};
