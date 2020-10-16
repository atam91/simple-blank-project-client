<template>
    <base-crud-table v-bind="options"
                     :filters="filters"
                     :default-create-item="defaultCreateItem">

        <template v-slot:mainHeader>
            <user-organization-input class="filter" v-model="filters.orgId" />
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
    import departmentsAdminApi from '../../api/admin/departments';
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
            value: 'organization'
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

            options: {
                tableTitle: 'Departments',
                headers,
                defaultItem: {
                    name: ''
                },

                createPermission: ACTIONS.DEPARTMENTS_CREATE,
                editPermission: ACTIONS.DEPARTMENTS_UPDATE,
                dropPermission: ACTIONS.DEPARTMENTS_DELETE,

                _getData: (params) => departmentsAdminApi.getList(params),
                _getItem: (id) => departmentsAdminApi.getItem(id),

                _createItem: (data) => departmentsAdminApi.createItem(data),
                _editItem: (id, data) => departmentsAdminApi.editItem(id, data),
                _dropItem: (id) => departmentsAdminApi.dropItem(id),

                entityDialogTitle: (id) => id ? `Edit Departments #${id}` : 'Add Departments',
                dropEntityDialogTitle: (id) => `Delete Departments #${id}`,

                _mapDataItem: (item) => Object.assign(item, {
                    organization: shortEntityTextMappers.organizations(item._org),
                }),
            }
        }),

        computed: {
            defaultCreateItem() {
                const { filters } = this;

                return {
                    orgId: filters.orgId,
                }
            },
        },
    }
</script>