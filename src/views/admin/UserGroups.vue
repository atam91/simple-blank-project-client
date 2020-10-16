<style lang="stylus" scoped>
    .page
        width 100%;
</style>

<template>
    <div class="page">
        <user-groups-crud-table />
    </div>
</template>


<script>
    import UserGroupsCrudTable from '../../components/crudTables/UserGroups'

    export default {
        components: {
            UserGroupsCrudTable
        }
    }
</script>