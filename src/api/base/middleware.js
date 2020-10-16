import Vue from 'vue';
import store from '@/store';
import router from '@/router';
import {
    LOGOUT_SUCCESS
} from '@/store/mutation-types';
import * as toastService from '../../services/toast';


export const response = (response, next) => {
    const { status, data, httpCode } = response;

    if (!status) {
        toastService.error(data.message || data.error || 'Request error');
    }

    if (httpCode === 401) {
        store.commit(LOGOUT_SUCCESS);
        router.replace('/login');
    }

    ////next(response);
};
