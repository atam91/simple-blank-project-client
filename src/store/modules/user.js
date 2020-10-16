import userApi from '../../api/user';
import {
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    USER_DATA,
    USER_PERMISSIONS,
    ORGANIZATION_DATA,
} from '../mutation-types';
import sessionService from '../../services/session';
import router from '../../router'



const state = {
    auth: false,
    user: {},
    permissions: [],
    organization: null,
};


const getters = {
    auth: state => state.auth,
    user: state => state.user,
    organization: state => state.organization,
    permissions: state => state.permissions,

    checkPermission: state => name => state.permissions.includes(name)
};


const actions = {
    async login({ commit, dispatch }, data) {
        try {
            const response = await userApi.doLogin(data);
            commit(LOGIN_SUCCESS, response.data.sid);
            commit(USER_DATA, response.data.user);                              /// FIXME nesting data??
            commit(USER_PERMISSIONS, response.data.permissions);

            dispatch('organization');

            return response.data.user;
        } catch (err) {
            throw err;
        }
    },

    async session({ commit, dispatch }) {
        try {
            const response = await userApi.getSession();
            commit(LOGIN_SUCCESS);
            commit(USER_DATA, response.data.user);                              /// FIXME nesting data??
            commit(USER_PERMISSIONS, response.data.permissions);

            dispatch('organization');
        } catch {
            commit(LOGOUT_SUCCESS);
        }

    },

    async organization({ commit }) {
        const response = await userApi.getOrganization();
        commit(ORGANIZATION_DATA, response.data);
    },

    async logout({ commit }) {
        await userApi.doLogout();
        commit(LOGOUT_SUCCESS);
        router.push('/login');
    }
};


const mutations = {
    [LOGIN_SUCCESS] (state, sid) {
        sid && sessionService.setToken(sid);
        state.auth = true;
    },

    [LOGOUT_SUCCESS] (state) {
        sessionService.dropToken();
        state.auth = false;
        state.user = {};
        state.permissions = [];
        state.organization = null;
    },

    [USER_DATA] (state, user) {
        state.user = user;
    },

    [ORGANIZATION_DATA] (state, organization) {
        state.organization = organization;
    },

    [USER_PERMISSIONS] (state, permissions) {
        state.permissions = permissions;
    },
};


export default {
    state,
    getters,
    actions,
    mutations
};
