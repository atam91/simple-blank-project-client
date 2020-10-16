<style lang="stylus" scoped>
    .page
        width 100%;
</style>


<template>
    <div class="page">
        <departments-crud-table />
    </div>
</template>


<script>
    import DepartmentsCrudTable from '../../components/crudTables/Departments'

    export default {
        components: {
            DepartmentsCrudTable
        }
    }
</script>