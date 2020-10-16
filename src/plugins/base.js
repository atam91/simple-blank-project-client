import Vue from 'vue';
import { mapGetters } from 'vuex';
import ACTIONS from '../constants/actions';


Vue.mixin({
    data: () => ({
        ACTIONS
    }),

    computed: mapGetters([ 'checkPermission' ]),
});
