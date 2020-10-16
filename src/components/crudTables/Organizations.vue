<template>
    <base-crud-table v-bind="options">

        <template v-slot:entityDialogData="{ item, disabled }">
            <v-container>
                <v-row>
                    <v-col cols="12" sm="8" md="8">
                        <v-text-field v-model="item.name" label="Name" :disabled="disabled" />
                    </v-col>
                </v-row>
            </v-container>
        </template>

    </base-crud-table>
</template>

<script>
    import BaseCrudTable from './BaseCrudTable';
    import ACTIONS from '../../constants/actions';
    import organizationsAdminApi from '../../api/admin/organizations';

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
            options: {
                tableTitle: 'Organizations',
                headers,
                defaultItem: {
                    name: ''
                },

                createPermission: ACTIONS.ORGANIZATIONS_CREATE,
                editPermission: ACTIONS.ORGANIZATIONS_UPDATE,
                dropPermission: ACTIONS.ORGANIZATIONS_DELETE,

                _getData: (params) => organizationsAdminApi.getList(params),
                _getItem: (id) => organizationsAdminApi.getItem(id),

                _createItem: (data) => organizationsAdminApi.createItem(data),
                _editItem: (id, data) => organizationsAdminApi.editItem(id, data),
                _dropItem: (id) => organizationsAdminApi.dropItem(id),

                entityDialogTitle: (id) => id ? `Edit Organizations #${id}` : 'Add Organizations',
                dropEntityDialogTitle: (id) => `Delete Organizations #${id}`,
            }
        })
    }
</script>