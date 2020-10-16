<style lang="stylus" scoped>
    .page
        width 100%;
</style>


<template>
    <div class="page">
        <users-crud-table :role="$route.meta.usersPageRole" />
    </div>
</template>


<script>
    import UsersCrudTable from '../../components/crudTables/Users'

    export default {
        components: {
            UsersCrudTable
        }
    }
</script>