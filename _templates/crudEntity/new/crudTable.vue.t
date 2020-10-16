---
to: src/components/crudTables/<%= h.changeCase.pascalCase(name) %>.vue
---
<%
    camel = h.changeCase.camelCase(name)
    constant = h.changeCase.constantCase(name)
    pascal = h.changeCase.pascalCase(name)
%><template>
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
    import <%= camel %>AdminApi from '../../api/admin/<%= camel %>';

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
                tableTitle: '<%= pascal %>',
                headers,
                defaultItem: {
                    name: ''
                },

                createPermission: ACTIONS.<%= constant %>_CREATE,
                editPermission: ACTIONS.<%= constant %>_UPDATE,
                dropPermission: ACTIONS.<%= constant %>_DELETE,

                _getData: (params) => <%= camel %>AdminApi.getList(params),
                _getItem: (id) => <%= camel %>AdminApi.getItem(id),

                _createItem: (data) => <%= camel %>AdminApi.createItem(data),
                _editItem: (id, data) => <%= camel %>AdminApi.editItem(id, data),
                _dropItem: (id) => <%= camel %>AdminApi.dropItem(id),

                entityDialogTitle: (id) => id ? `Edit <%= pascal %> #${id}` : 'Add <%= pascal %>',
                dropEntityDialogTitle: (id) => `Delete <%= pascal %> #${id}`,
            }
        })
    }
</script>