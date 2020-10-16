<style lang="stylus" scoped>
    .filter
        margin-right 10px
</style>

<template>
    <base-crud-table v-bind="options"
                     :filters="filters"
                     :_map-data-item="itemMapper"
                     :on-edit-item="onEditItem"
                     @click:row="onEditItem">

        <template v-slot:mainHeader>
            <user-organization-input class="filter" v-model="filters.orgId" />

            <w-combobox class="filter"
                        v-model="filters.ownerId"
                        :default-params="{ orgId: filters.orgId }"
                        entity-type="users"
                        label="Owner"
                        filter />
        </template>

        <template v-slot:entityDialogData="{ item, disabled }">
            <v-container>
                <v-row>
                    <v-col cols="12" sm="12" md="12">
                        <v-text-field v-model="item.name" label="Name" :disabled="disabled" />
                    </v-col>

                    <v-col cols="12" sm="12" md="12">
                        <user-organization-input v-model="item.orgId" :disabled="disabled" />
                    </v-col>
                </v-row>
            </v-container>
        </template>

    </base-crud-table>
</template>

<script>
    import BaseCrudTable from './BaseCrudTable';
    import ACTIONS from '../../constants/actions';
    import userGroupsAdminApi from '../../api/admin/userGroups';
    import shortEntityTextMappers from '../../helpers/shortEntityTextMappers';

    const headers = [
        {
            text: '# id',
            value: 'id',
        },
        {
            text: 'Name',
            value: 'name',
        },
        {
            text: 'Organization',
            value: 'organization',
        },
        {
            text: 'Owner',
            value: 'owner',
        },
        {
            text: 'Actions',
            value: 'action',
            sortable: false
        },
    ];

    export default {
        components: {
            BaseCrudTable
        },

        data: () => ({
            filters: {},

            itemMapper: (item) => Object.assign(item, {
                organization: shortEntityTextMappers.organizations(item._org),
                owner: shortEntityTextMappers.users(item._owner),
            }),

            options: {
                tableTitle: 'UserGroups',
                headers,
                defaultItem: {
                    name: ''
                },

                createPermission: ACTIONS.USER_GROUPS_CREATE,
                editPermission: ACTIONS.USER_GROUPS_UPDATE,
                dropPermission: ACTIONS.USER_GROUPS_DELETE,

                _getData: (params) => userGroupsAdminApi.getList(params),
                _getItem: (id) => userGroupsAdminApi.getItem(id),

                _createItem: (data) => userGroupsAdminApi.createItem(data),
                _editItem: (id, data) => userGroupsAdminApi.editItem(id, data),
                _dropItem: (id) => userGroupsAdminApi.dropItem(id),

                entityDialogTitle: (id) => id ? `Edit UserGroups #${id}` : 'Add UserGroups',
                dropEntityDialogTitle: (id) => `Delete UserGroups #${id}`,
            }
        }),

        methods: {
            onEditItem(item) {
                this.$router.push('/admin/userGroups/' + item.id);
            }
        },
    }
</script>