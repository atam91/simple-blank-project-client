import makeRequest from '../base';


const roles = role => ({ roles: role + 's' });

const createItem = role => data => makeRequest({ ...roles(role), res: 'usersCreateItem' }, data);

const getList = role => (params) => makeRequest({ ...roles(role), res: 'usersList', params });

const getShortList = (params) => makeRequest({ res: 'usersShortList', params });

const getItem = role => id => makeRequest({ ...roles(role), res: 'usersItem', id });

const editItem = role => (id, data) => makeRequest({ ...roles(role), res: 'usersEditItem', id }, data);

const dropItem = role => id => makeRequest({ ...roles(role), res: 'usersDropItem', id });


export default {
    createItem,
    getList,
    getShortList,
    getItem,
    editItem,
    dropItem,
};
