import Vue from 'vue';
import VueRouter from 'vue-router';
import sessionService from './services/session';
import logger from './services/logger';
import Store from './store';
import ACTIONS from './constants/actions';

import Login from './views/Login';
import Dashboard from './views/Dashboard';
import UserApp from './views/user/UserApp';
import AdminUsersLayout from './views/admin/UsersLayout';
import AdminUsersPage from './views/admin/UsersPage';
import AdminOrganizations from './views/admin/Organizations';
import AdminDepartments from './views/admin/Departments';
import AdminUserGroups from './views/admin/UserGroups';
import AdminUserGroup from './views/admin/UserGroup';
/// HERE Inject View Components Import ///


Vue.use(VueRouter);

const auth = true;
const nonAuth = true;
const headerBar = true;
const navigation = true;


const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: { nonAuth }
    },

    {
        path: '/authed',
        redirect: to => {
            const user = Store.getters.user;
            if (!user.role) return '/login';

            return DEFAULT_ROUTES_BY_ROLES[user.role];
        }
    },

    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: { auth, navigation, headerBar, permission: ACTIONS.VIEW_DASHBOARD, }
    },
    {
        path: '/userApp',
        name: 'userApp',
        component: UserApp,
        meta: { auth, headerBar }
    },

    {
        path: '/admin/users',
        redirect: '/admin/users/users',
        component: AdminUsersLayout,
        meta: { auth, headerBar, navigation, permission: ACTIONS.VIEW_ADMIN, },
        children: [
            {
                path: 'admins',
                component: AdminUsersPage,
                meta: { auth, headerBar, navigation, usersPageRole: 'admin', permission: ACTIONS.VIEW_ADMIN, }
            },
            {
                path: 'org_admins',
                component: AdminUsersPage,
                meta: { auth, headerBar, navigation, usersPageRole: 'org_admin', permission: ACTIONS.VIEW_ADMIN, }
            },
            {
                path: 'managers',
                component: AdminUsersPage,
                meta: { auth, headerBar, navigation, usersPageRole: 'manager', permission: ACTIONS.VIEW_ADMIN, }
            },
            {
                path: 'users',
                component: AdminUsersPage,
                meta: { auth, headerBar, navigation, usersPageRole: 'user', permission: ACTIONS.VIEW_ADMIN, }
            },
        ]
    },

    {
        path: '/admin/organizations',
        component: AdminOrganizations,
        meta: { auth, headerBar, navigation }
    },
    {
        path: '/admin/departments',
        component: AdminDepartments,
        meta: { auth, headerBar, navigation }               //// TODO ADD permission: ACTIONS.VIEW_ADMIN    to gen
    },
    {
        path: '/admin/userGroups',
        component: AdminUserGroups,
        meta: { auth, headerBar, navigation, permission: ACTIONS.VIEW_ADMIN }
    },
    {
        path: '/admin/userGroups/:id',
        component: AdminUserGroup,
        meta: { auth, headerBar, navigation, permission: ACTIONS.VIEW_ADMIN },
        props: true,
    },
    /// HERE Inject Routes ///

    /*{
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ ///'../views/About.vue')
    //}*/
];


const router = new VueRouter({
    mode: 'history',
    routes
});
export default router;


export const DEFAULT_ROUTES_BY_ROLES = {
    admin: '/dashboard',
    org_admin: '/dashboard',
    manager: '/dashboard',
    user: '/userApp',
};

/// CHECK AUTH & SIDE ///
router.beforeEach((to, from, next) => {
    const handler = () => {
        const user = Store.getters.user;
        const userPermissions = Store.getters.permissions;

        if (!to.matched.length) {
            logger.log('Miss route for', to.path);

            if (!from.matched.length) {
                logger.log('Init with unknown route');

                if (user && user.role) {
                    return next(DEFAULT_ROUTES_BY_ROLES[user.role]);
                }

                return next('/login');
            }

            return next(false);
        }

        if (to.meta.auth && !sessionService.isAuth()) {
            logger.log('Deny auth route', to.path);
            return next('/login');
        }

        if (to.meta.permission && !userPermissions.includes(to.meta.permission)) {
            logger.log('Deny route cause of permission', to.path);
            return next(DEFAULT_ROUTES_BY_ROLES[user.role]);
        }

        if (to.meta.nonAuth && sessionService.isAuth()) {
            logger.log('Deny nonAuth route', to.path);
            return next(DEFAULT_ROUTES_BY_ROLES[user.role]);
        }

        next();
    };

    if (sessionService.isAuthing()) {
        sessionService.addAfterAuthJob(handler);
    } else {
        handler();
    }
});
