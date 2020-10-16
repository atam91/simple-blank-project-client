import makeRequest from '../base';


const getList = (params) => makeRequest({ res: 'departmentsList', params });

const getShortList = (params) => makeRequest({ res: 'departmentsShortList', params });

const createItem = data => makeRequest({ res: 'departmentsCreateItem' }, data);

const getItem = id => makeRequest({ res: 'departmentsItem', id });

const editItem = (id, data) => makeRequest({ res: 'departmentsEditItem', id }, data);

const dropItem = id => makeRequest({ res: 'departmentsDropItem', id });


export default {
    getList,
    getShortList,
    createItem,
    getItem,
    editItem,
    dropItem,
};

