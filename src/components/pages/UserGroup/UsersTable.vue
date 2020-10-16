<style lang="stylus" scoped>
    .filter
        margin-right 10px
</style>

<template>
    <base-crud-table :headers="headers"
                     table-title="Users"
                     :_map-data-item="itemMapper"
                     :filters="filters"
                     :_get-data="_getData"
                     :default-params="{ orgId }">

        <template v-slot:mainHeader>
            <w-combobox class="filter"
                        v-model="filters.depId"
                        :default-params="{ orgId }"
                        entity-type="departments"
                        label="Department"
                        filter />
        </template>

        <template v-slot:item.extraAction="{ item }">
            <slot name="item.action" v-bind:item="item"></slot>
        </template>
    </base-crud-table>
</template>


<script>
    import BaseCrudTable from '../../crudTables/BaseCrudTable';
    import usersAdminApi from '../../../api/admin/users'
    import shortEntityTextMappers from '../../../helpers/shortEntityTextMappers';

    const ROLE = 'user';

    export const headers = [
        {
            text: '# id',
            value: 'id',
        },
        {
            text: 'Login',
            value: 'login',
        },
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

        {
            text: 'Actions',
            value: 'extraAction',
            sortable: false
        }
    ];


    export default {
        components: {
            BaseCrudTable
        },

        props: [ 'orgId' ],

        data: () => ({
            filters: {},
            headers,

            itemMapper: (item) => Object.assign(item, {
                organization: shortEntityTextMappers.organizations(item._org),
                department: shortEntityTextMappers.departments(item._department),
            }),
        }),

        methods: {
            _getData(params) { return usersAdminApi.getList(ROLE)(params); },
        },
    }
</script>
