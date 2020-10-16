<style lang="stylus" scoped>
    .title
        line-height 1.1em !important
        &--active
            font-weight bold !important
</style>


<template>
    <v-navigation-drawer app
                         :value="value"
                         @input="$emit('input', $event)">

        <v-list-item link @click="routerPush('/dashboard')">
            <v-list-item-content>
                <v-list-item-title class="title"
                                   :class="{ 'title--active': $route.path.startsWith('/dashboard') }">
                    Simple Blank Project
                </v-list-item-title>

                <!--<v-list-item-subtitle>
                    subtext
                </v-list-item-subtitle>-->
            </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list
                dense
                nav
        >
            <v-list-item
                    v-for="item in visibleItems"
                    :key="item.title"
                    link
                    @click="routerPush(item.to)"
            >
                <!--<v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>-->

                <v-list-item-content >
                    <v-list-item-title class="title"
                                       :class="{ 'title--active': $route.path.startsWith(item.to) }"
                    >
                        {{ item.title }}
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>


<script>
    import ACTIONS from '../constants/actions';

    const menuItems = [
        {
            title: 'Users',
            to: '/admin/users',
            someOfPermissions: [
                ACTIONS.USERS_ADMINS_READ,
                ACTIONS.USERS_ORG_ADMINS_READ,
                ACTIONS.USERS_MANAGERS_READ,
                ACTIONS.USERS_USERS_READ,
            ]
        },

        {
            title: 'Organizations',
            to: '/admin/organizations',
            permission: ACTIONS.ORGANIZATIONS_READ
        },

        {
            title: 'Departments',
            to: '/admin/departments',
            permission: ACTIONS.DEPARTMENTS_READ
        },

        {
            title: 'UserGroups',
            to: '/admin/userGroups',
            permission: ACTIONS.USER_GROUPS_READ
        },

        /// HERE Inject SideMenu Items ///
    ];

    export default {
        name: 'SideMenu',

        props: [ 'value' ],

        data: () => ({
            menuItems
        }),

        computed: {
            visibleItems() {
                return menuItems.filter(
                    item => item.permission && this.checkPermission(item.permission)
                        || item.someOfPermissions && item.someOfPermissions.some(this.checkPermission)
                );
            }
        },

        methods: {
            routerPush(to) {
                if (this.$route.path === to) return;

                this.$router.push(to);
            }
        },
    }
</script>
