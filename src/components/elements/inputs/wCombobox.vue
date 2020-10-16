<template>
    <combobox
            :value="value"
            @input="$emit('input', $event)"
            @update:raw="$emit('update:raw', $event)"
            :label="label"
            :default-params="defaultParams"
            :itemsGetter="itemsGetter"
            :itemsMapper="itemsMapper"
            :disabled="disabled"
            :filter="filter" />
</template>


<script>
    import Combobox from './Combobox';
    import shortEntityTextMappers from '../../../helpers/shortEntityTextMappers'

    import organizationsAdminApi from '../../../api/admin/organizations';
    import departmentsAdminApi from '../../../api/admin/departments';
    import usersAdminApi from '../../../api/admin/users';


    const ENTITY_TYPES = {
        organizations: {
            getter: organizationsAdminApi.getShortList,
            mapper: item => ({
                value: item.id,
                text: shortEntityTextMappers.organizations(item),
            })
        },

        departments: {
            getter: departmentsAdminApi.getShortList,
            mapper: item => ({
                value: item.id,
                text: shortEntityTextMappers.departments(item),
            })
        },

        users: {
            getter: usersAdminApi.getShortList,
            mapper: item => ({
                value: item.id,
                text: shortEntityTextMappers.users(item),
            })
        },
    };


    export default {
        components: {
            Combobox
        },

        props: {
            entityType: String,
            value: {},
            label: String,
            defaultParams: Object,
            disabled: {
                type: Boolean,
                default: false
            },
            filter: {
                type: Boolean,
                default: false,
            },
        },

        data: () => ({
            ENTITY_TYPES
        }),

        computed: {
            itemsGetter() {
                return this.ENTITY_TYPES[this.entityType].getter;
            },
            itemsMapper() {
                return this.ENTITY_TYPES[this.entityType].mapper;
            },
        },

        mounted() {
            if (!this.entityType) throw new Error('Missing wCombobox entityType');
            if (!this.ENTITY_TYPES[this.entityType]) throw new Error('Unknown wCombobox entityType');
        }
    };
</script>
