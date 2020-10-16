<style lang="stylus" scoped>
    .router-link-active
        color black
        font-weight bold
        text-decoration none
        cursor default

    .navigation-menu a
        margin-right 20px

</style>

<template>
    <v-app-bar app>
        <v-app-bar-nav-icon v-if="$route.meta.navigation" @click="$emit('update:sideMenu', !sideMenu)"></v-app-bar-nav-icon>

        <v-toolbar-title>Simple Blank Project</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-toolbar-title>
            {{ user.login }}

            <span v-if="user.name">
                \ {{ user.name }}
            </span>
        </v-toolbar-title>

        <v-btn icon @click="logout">
            <v-icon>logout</v-icon>
        </v-btn>
    </v-app-bar>
</template>


<script>
    import { mapActions, mapGetters } from 'vuex';


    export default {
        name: 'AppBar',

        props: [ 'sideMenu' ],

        computed: mapGetters([ 'user' ]),

        methods: mapActions([ 'logout' ]),
    }
</script>
