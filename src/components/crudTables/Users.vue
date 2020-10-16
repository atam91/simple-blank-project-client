<style lang="stylus" scoped>
    .filter
        margin-right 10px
</style>

<template>
    <base-crud-table ref="table"
                     :headers="headers"
                     :default-item="defaultItem"
                     :table-title="tableTitle"
                     :create-permission="createPermission"
                     :edit-permission="editPermission"
                     :drop-permission="dropPermission"
                     :_map-data-item="itemMapper"
                     :filters="filters"
                     :_get-data="_getData"
                     :_get-item="_getItem"
                     :_create-item="_createItem"
                     :_edit-item="_editItem"
                     :_drop-item="_dropItem"
                     :entity-dialog-title="entityDialogTitle"
                     :drop-entity-dialog-title="dropEntityDialogTitle"
                     :default-create-item="defaultCreateItem">

        <template v-slot:mainHeader>
            <user-organization-input v-if="role !== 'admin'"
                          class="filter"
                          v-model="filters.orgId"/>

            <w-combobox v-if="role !== 'admin'"
                        class="filter"
                        v-model="filters.depId"
                        :default-params="{ orgId: filters.orgId }"
                        entity-type="departments"
                        label="Department"
                        filter
                        :disabled="!filters.orgId" />
        </template>

        <template v-slot:entityDialogData="{ item, disabled }">
            <v-container>
                <v-row>
                    <v-col cols="12" sm="6" md="6">
                        <v-text-field v-model="item.login" label="Login" :disabled="disabled" />
                    </v-col>

                    <v-col cols="12" sm="6" md="6">
                        <v-text-field v-model="item.password" label="Password" type="password" :disabled="disabled" />
                    </v-col>

                    <template v-if="role !== 'admin'">
                        <v-col cols="12" sm="12" md="12">
                            <v-text-field v-model="item.name" label="Name" :disabled="disabled" />
                        </v-col>

                        <v-col cols="12" sm="12" md="12">
                            <v-text-field v-model="item.email" label="Email" :disabled="disabled" />
                        </v-col>

                        <v-col cols="12" sm="12" md="12">
                            <user-organization-input v-model="item.orgId" :disabled="disabled" />
                        </v-col>

                        <v-col cols="12" sm="12" md="12">
                            <w-combobox v-model="item.departmentId"
                                        entity-type="departments"
                                        :default-params="{ orgId: item.orgId }"
                                        :disabled="!item.orgId || disabled"
                                        label="Department"
                                        filter />
                        </v-col>
                    </template>
                </v-row>
            </v-container>
        </template>

    </base-crud-table>
</template>


<script>
    import BaseCrudTable from './BaseCrudTable';
    import ACTIONS from '../../constants/actions'
    import usersAdminApi from '../../api/admin/users'
    import shortEntityTextMappers from '../../helpers/shortEntityTextMappers';


    const ROLES_MAP = {
        admin: 'Admins',
        org_admin: 'Organization Admins',
        manager: 'Managers',
        user: 'Users',
    };

    const ROLES_GENETIVE_MAP = {
        admin: 'Admin',
        org_admin: 'Organization Admin',
        manager: 'Manager',
        user: 'User',
    };

    const ACTIONS_MAP_BY_ENTITY_ROLE = {
        admin: {
            create: ACTIONS.USERS_ADMINS_CREATE,
            update: ACTIONS.USERS_ADMINS_UPDATE,
            drop: ACTIONS.USERS_ADMINS_DELETE,
        },

        org_admin: {
            create: ACTIONS.USERS_ORG_ADMINS_CREATE,
            update: ACTIONS.USERS_ORG_ADMINS_UPDATE,
            drop: ACTIONS.USERS_ORG_ADMINS_DELETE,
        },

        manager: {
            create: ACTIONS.USERS_MANAGERS_CREATE,
            update: ACTIONS.USERS_MANAGERS_UPDATE,
            drop: ACTIONS.USERS_MANAGERS_DELETE,
        },

        user: {
            create: ACTIONS.USERS_USERS_CREATE,
            update: ACTIONS.USERS_USERS_UPDATE,
            drop: ACTIONS.USERS_USERS_DELETE,
        },
    };


    export default {
        components: {
            BaseCrudTable
        },

        props: [ 'role' ],

        data: () => ({
            defaultItem: {
                login: '',
                password: ''
            },

            filters: {},

            itemMapper: (item) => Object.assign(item, {
                organization: shortEntityTextMappers.organizations(item._org),
                department: shortEntityTextMappers.departments(item._department),
            }),
        }),

        computed: {
            tableTitle() {
                return ROLES_MAP[this.role];
            },

            headers() {
                const { role } = this;

                return [
                    {
                        text: '# id',
                        value: 'id',
                    },
                    {
                        text: 'Login',
                        value: 'login',
                    },
                ].concat(
                    role !== 'admin' && [
                        {
                            text: 'Name',
                            value: 'name'
                        },
                        {
                            text: 'Email',
                            value: 'email'
                        },
                        {
                            text: 'Organization',
                            value: 'organization'
                        },
                        {
                            text: 'Department',
                            value: 'department'
                        },
                    ],

                    {
                        text: 'Actions',
                        value: 'action',
                        sortable: false
                    }
                )
            },

            createPermission() {
                return (ACTIONS_MAP_BY_ENTITY_ROLE[this.role] || {})['create'];
            },

            editPermission() {
                return (ACTIONS_MAP_BY_ENTITY_ROLE[this.role] || {})['update'];
            },

            dropPermission() {
                return (ACTIONS_MAP_BY_ENTITY_ROLE[this.role] || {})['drop'];
            },

            defaultCreateItem() {
                const { filters } = this;

                return {
                    orgId: filters.orgId,
                    departmentId: filters.depId
                }
            },
        },

        watch: {
            role() {
                this.$refs.table.getData();
            }
        },

        methods: {
            _getData(params) { return usersAdminApi.getList(this.role)(params); },
            _getItem(id) { return usersAdminApi.getItem(this.role)(id); },

            _createItem(data) { return usersAdminApi.createItem(this.role)(data); },
            _editItem(id, data) { return usersAdminApi.editItem(this.role)(id, data); },
            _dropItem(id) { return usersAdminApi.dropItem(this.role)(id); },

            entityDialogTitle(id) {
                const genetive = ROLES_GENETIVE_MAP[this.role];

                return id ? `Edit ${genetive} #${id}` : `Add ${genetive}`;
            },
            dropEntityDialogTitle(id) {
                return `Delete ${ROLES_GENETIVE_MAP[this.role]} #${id}`;
            },
        },
    }
</script>
