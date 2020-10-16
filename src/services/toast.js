import Vue from 'vue';
import Toasted from 'vue-toasted';

Vue.use(Toasted);


const genNotify = (type = 'default') => (message) => {
    Vue.toasted.show(
        message,
        {
            type,
            duration: 6000
        }
    );
};

export const success = genNotify('success');
export const info = genNotify('info');
export const error = genNotify('error');