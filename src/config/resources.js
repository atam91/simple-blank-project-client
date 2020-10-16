import Module from '../api/base/Module';
import { API_URL } from './index';


const api = Module(API_URL);


export default {
    login: api.post('/login', false),
    session: api.get('/session'),
    organization: api.get('/org'),
    logout: api.post('/logout'),

    usersList: api.get('/admin/users/:roles'),
    usersShortList: api.get('/admin/users/short'),
    usersCreateItem: api.post('/admin/users/:roles'),
    usersItem: api.get('/admin/users/:roles/:id'),
    usersEditItem: api.put('/admin/users/:roles/:id'),
    usersDropItem: api.drop('/admin/users/:roles/:id'),

    organizationsList: api.get('/admin/organizations'),
    organizationsShortList: api.get('/admin/organizations/short'),
    organizationsCreateItem: api.post('/admin/organizations'),
    organizationsItem: api.get('/admin/organizations/:id'),
    organizationsEditItem: api.put('/admin/organizations/:id'),
    organizationsDropItem: api.drop('/admin/organizations/:id'),

    departmentsList: api.get('/admin/departments'),
    departmentsShortList: api.get('/admin/departments/short'),
    departmentsCreateItem: api.post('/admin/departments'),
    departmentsItem: api.get('/admin/departments/:id'),
    departmentsEditItem: api.put('/admin/departments/:id'),
    departmentsDropItem: api.drop('/admin/departments/:id'),

    userGroupsList: api.get('/admin/userGroups'),
    userGroupsShortList: api.get('/admin/userGroups/short'),
    userGroupsCreateItem: api.post('/admin/userGroups'),
    userGroupsItem: api.get('/admin/userGroups/:id'),
    userGroupsEditItem: api.put('/admin/userGroups/:id'),
    userGroupsDropItem: api.drop('/admin/userGroups/:id'),
    getGroupUsersList: api.get('/admin/userGroupUsers/:id'),
    addUserToGroup: api.post('/admin/userGroupUsers/:id/:userId'),
    dropUserFromGroup: api.drop('/admin/userGroupUsers/:id/:userId'),

    /// HERE Inject Resources ///
};
