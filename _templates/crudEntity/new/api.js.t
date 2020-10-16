---
to: src/api/admin/<%= h.changeCase.camelCase(name) %>.js
---
<%
    camel = h.changeCase.camelCase(name)
%>import makeRequest from '../base';


const getList = (params) => makeRequest({ res: '<%= camel %>List', params });

const getShortList = (params) => makeRequest({ res: '<%= camel %>ShortList', params });

const createItem = data => makeRequest({ res: '<%= camel %>CreateItem' }, data);

const getItem = id => makeRequest({ res: '<%= camel %>Item', id });

const editItem = (id, data) => makeRequest({ res: '<%= camel %>EditItem', id }, data);

const dropItem = id => makeRequest({ res: '<%= camel %>DropItem', id });


export default {
    getList,
    getShortList,
    createItem,
    getItem,
    editItem,
    dropItem,
};
<%
    console.log();
    console.log('!!! Do not forget sync ACTIONS with server !!!');
    console.log('### cp ../server/app/constants/actions.js ./src/constants/actions.js');
    console.log();
%>
