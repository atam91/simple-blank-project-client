import makeRequest from '../base';


const getList = (params) => makeRequest({ res: 'organizationsList', params });

const getShortList = (params) => makeRequest({ res: 'organizationsShortList', params });

const createItem = data => makeRequest({ res: 'organizationsCreateItem' }, data);

const getItem = id => makeRequest({ res: 'organizationsItem', id });

const editItem = (id, data) => makeRequest({ res: 'organizationsEditItem', id }, data);

const dropItem = id => makeRequest({ res: 'organizationsDropItem', id });


export default {
    getList,
    getShortList,
    createItem,
    getItem,
    editItem,
    dropItem,
};

