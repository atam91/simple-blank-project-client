import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger';
import modules from './modules';
import sessionService from '../services/session';

Vue.use(Vuex);

const devMode = (process.env.NODE_ENV === 'development');

const plugins = [
  devMode && createLogger(),
  sessionService.initStorePlugin
].filter(v => v);


export default new Vuex.Store({
  modules,
  plugins,
  strict: devMode
});
