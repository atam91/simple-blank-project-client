import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'normalize.css'

import vuetify from './plugins/vuetify'
import base from './plugins/base'
import elements from './plugins/elements'

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
    vuetify
}).$mount('#app');



/**if ('development' === process.env.NODE_ENV) {
    window.onerror = function(msg, url, line, col, error) {
        // Note that col & error are new to the HTML 5 spec and may not be
        // supported in every browser.  It worked for me in Chrome.
        var extra = !col ? '' : '\ncolumn: ' + col;
        extra += !error ? '' : '\nerror: ' + error;

        // You can view the information in an alert to see things working like this:
        alert("Error: " + msg + "\nurl: " + url + "\nline: " + line + extra);

        // TODO: Report this error via ajax so you can keep track
        //       of what pages have JS issues

        var suppressErrorAlert = true;
        // If you return true, then error alerts (like in older versions of
        // Internet Explorer) will be suppressed.
        return suppressErrorAlert;
    };
}**/
