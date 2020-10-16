<template>
    <v-card v-if="remoteItemLoaded">
        <form @submit.prevent="saveItem">
            <v-card-title>
                <span class="headline">UserGroup #{{ id }}</span>
            </v-card-title>

            <v-card-text>
                <v-container fluid>
                    <v-row>
                        <v-col cols="12" md="4" sm="6" xs="12">
                            <v-text-field v-model="item.name" label="Name" />
                        </v-col>

                        <v-col cols="12" md="4" sm="6" xs="12">
                            <w-combobox v-model="item.orgId"
                                        entityType="organizations"
                                        label="Organization"
                                        disabled />
                        </v-col>

                        <v-col v-if="checkPermission(ACTIONS.ANY_OWNER_ACCESS)" cols="12" md="4" sm="6" xs="12">
                            <w-combobox v-model="item.ownerId"
                                        entityType="users"
                                        label="Owner"
                                        disabled />
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="cancelItemChange" :disabled="!isItemChanged">Reset</v-btn>
                <v-btn text type="submit" :loading="savingItem" :disabled="savingItem || !isItemChanged">Save</v-btn>
            </v-card-actions>
        </form>
    </v-card>
</template>


<script>
    import userGroupsAdminApi from '../../../api/admin/userGroups';
    import { jsonEquals } from '../../../utils/base';

    export default {
        props: [ 'id' ],

        data: () => ({
            remoteItem: {},
            item: {},
            remoteItemLoaded: false,
            savingItem: false,
        }),

        computed: {
            isItemChanged() {
                return !jsonEquals(this.item, this.remoteItem);
            },
        },

        watch: {
            item(val) {
                this.$emit('item', val);
            }
        },

        methods: {
            cancelItemChange() {
                this.item = Object.assign({}, this.remoteItem);
            },

            async saveItem() {
                const { id, item } = this;

                await userGroupsAdminApi.editItem(id, item);

                await this.getData();
            },

            async getData() {
                await userGroupsAdminApi.getItem(this.id)
                    .then(resp => {
                        this.remoteItem = resp.data;
                        this.item = Object.assign({}, this.remoteItem);
                        this.remoteItemLoaded = true;
                    });
            },
        },

        mounted() {
            this.getData();
        },
    }
</script>