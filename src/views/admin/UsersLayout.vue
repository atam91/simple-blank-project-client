<style lang="stylus" scoped>
    .page
        width 100%;
</style>

<template>
    <div class="page">
        <v-tabs>
            <v-tab v-if="checkPermission(ACTIONS.USERS_ADMINS_READ)" to="/admin/users/admins">
                Admins
            </v-tab>
            <v-tab v-if="checkPermission(ACTIONS.USERS_ORG_ADMINS_READ)" to="/admin/users/org_admins">
                Org Admins
            </v-tab>
            <v-tab v-if="checkPermission(ACTIONS.USERS_MANAGERS_READ)" to="/admin/users/managers">
                Managers
            </v-tab>
            <v-tab v-if="checkPermission(ACTIONS.USERS_USERS_READ)" to="/admin/users/users">
                Users
            </v-tab>
        </v-tabs>

        <router-view></router-view>
    </div>
</template>