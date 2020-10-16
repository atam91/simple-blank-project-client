<style lang="stylus">
  html, body
    width: 100%
    height: 100%

  #app
    width: 100%;
    height: 100%;

  .full-height
    height: 100%
    display flex
</style>

<template>
  <v-app>
    <side-menu v-if="$route.meta.navigation" v-model="sideMenu"></side-menu>

    <template v-if="$route.meta.headerBar">
      <app-bar :side-menu.sync="sideMenu"></app-bar>
    </template>

    <v-content>
      <v-container class="full-height" fluid>
        <router-view/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import SideMenu from './components/SideMenu';
  import AppBar from './components/AppBar';

  export default {
    name: 'App',

    components: {
      SideMenu,
      AppBar
    },

    data: () => ({
      sideMenu: true,
    }),
  }
</script>

