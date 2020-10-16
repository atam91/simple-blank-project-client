---
to: src/views/admin/<%= h.changeCase.pascalCase(name) %>.vue
---
<template>
    <div>
        <<%= h.changeCase.paramCase(name) %>-crud-table />
    </div>
</template>


<script>
    import <%= h.changeCase.pascalCase(name) %>CrudTable from '../../components/crudTables/<%= h.changeCase.pascalCase(name) %>'

    export default {
        components: {
            <%= h.changeCase.pascalCase(name) %>CrudTable
        }
    }
</script>