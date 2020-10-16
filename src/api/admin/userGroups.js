import makeRequest from '../base';


const getList = (params) => makeRequest({ res: 'userGroupsList', params });

const getShortList = (params) => makeRequest({ res: 'userGroupsShortList', params });


const getGroupUsersList = (id) => makeRequest({ res: 'getGroupUsersList', id });

const addUserToGroup = (id, userId) => makeRequest({ res: 'addUserToGroup', id, userId });

const dropUserFromGroup = (id, userId) => makeRequest({ res: 'dropUserFromGroup', id, userId });


const createItem = data => makeRequest({ res: 'userGroupsCreateItem' }, data);

const getItem = id => makeRequest({ res: 'userGroupsItem', id });

const editItem = (id, data) => makeRequest({ res: 'userGroupsEditItem', id }, data);

const dropItem = id => makeRequest({ res: 'userGroupsDropItem', id });


export default {
    getList,
    getShortList,

    getGroupUsersList,
    addUserToGroup,
    dropUserFromGroup,

    createItem,
    getItem,
    editItem,
    dropItem,
};

