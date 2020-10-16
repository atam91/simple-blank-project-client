<template>
    <div>
        <v-card class="mt-2">
            <v-card-title>Users in group</v-card-title>

            <v-card-text>
                <v-data-table
                        :headers="headers"
                        :items="groupUsers"
                        :items-per-page="-1"
                >
                    <template v-slot:item.extraAction="{ item }">
                        <v-icon @click="removeUserFromGroup(item)">
                            clear
                        </v-icon>
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>

        <users-table class="mt-4" :orgId="userGroup.orgId">
            <template v-slot:item.action="{ item }">
                <v-icon v-if="!groupUsers.find(i => i.id === item.id)"
                        @click="addUserToGroup(item)">
                    add
                </v-icon>

                <v-icon v-else @click="removeUserFromGroup(item)">
                    clear
                </v-icon>
            </template>
        </users-table>
    </div>
</template>


<script>
    import userGroupsAdminApi from '../../../api/admin/userGroups';
    import UsersTable, { headers } from './UsersTable';
    import shortEntityTextMappers from '../../../helpers/shortEntityTextMappers';

    export default {
        components: {
            UsersTable
        },

        props: [ 'userGroupId', 'userGroup' ],

        data: () => ({
            headers,
            groupUsers: [],
        }),

        methods: {
            async getData() {
                await userGroupsAdminApi.getGroupUsersList(this.userGroupId)
                    .then(resp => {
                        this.groupUsers = resp.data.map(this.itemMapper);
                    });
            },

            itemMapper: (item) => Object.assign(item, {
                organization: shortEntityTextMappers.organizations(item._org),
                department: shortEntityTextMappers.departments(item._department),
            }),

            async addUserToGroup(item) {
                await userGroupsAdminApi.addUserToGroup(this.userGroupId, item.id);

                this.groupUsers.push(item);
            },

            async removeUserFromGroup({ id }) {
                await userGroupsAdminApi.dropUserFromGroup(this.userGroupId, id);

                this.groupUsers = this.groupUsers.filter(i => i.id !== id);
            },
        },

        mounted() {
            this.getData();
        },
    }
</script>
