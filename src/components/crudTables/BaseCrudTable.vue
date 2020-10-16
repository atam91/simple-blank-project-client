<template>
    <v-card>
        <v-card-title>
            {{ tableTitle }}

            <v-dialog v-if="showTable" v-model="entityDialog" max-width="600px">
                <template  v-slot:activator="{ on }">
                    <v-btn icon large v-on="on" v-show="createPermission && checkPermission(createPermission)">
                        <v-icon>add</v-icon>
                    </v-btn>
                </template>

                <v-card>
                    <form @submit.prevent="saveEntity">
                        <v-card-title v-if="entityDialog">
                            <span class="headline">{{ entityDialogTitle(editingId) }}</span>
                        </v-card-title>

                        <v-card-text>
                            <slot name="entityDialogData"
                                  v-if="entityDialog"
                                  v-bind:item="entityItem"
                                  v-bind:disabled="false"
                                  v-bind:active="entityDialog">
                            </slot>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn text @click="entityDialog = false">Cancel</v-btn>
                            <v-btn text type="submit" :loading="savingEntityDialog" :disabled="savingEntityDialog">Save</v-btn>
                        </v-card-actions>
                    </form>
                </v-card>
            </v-dialog>

            <v-spacer></v-spacer>

            <slot name="mainHeader"></slot>

            <v-spacer></v-spacer>

            <v-text-field
                    v-if="haveSearch && showTable"
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                    clearable
            ></v-text-field>
        </v-card-title>

        <v-dialog v-model="dropEntityDialog" max-width="500px">
            <v-card>
                <form @submit.prevent="deleteItem">
                    <v-card-title v-if="dropEntityDialog">
                        <span class="headline">{{ dropEntityDialogTitle(dropEntityId) }}</span>
                    </v-card-title>

                    <v-card-text>
                        <slot name="entityDialogData"
                              v-if="dropEntityDialog"
                              v-bind:item="dropEntityItem"
                              v-bind:disabled="true"
                              v-bind:active="dropEntityDialog">
                        </slot>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text @click="dropEntityDialog = false">Cancel</v-btn>
                        <v-btn text type="submit">Delete</v-btn>
                    </v-card-actions>
                </form>
            </v-card>
        </v-dialog>


        <v-data-table
                v-if="showTable"
                :headers="headers"
                :loading="loading"
                :items="items"
                :server-items-length="totalCount"
                :items-per-page.sync="limit"
                :page.sync="page"
                :sortBy.sync="sortBy"
                :sortDesc.sync="sortDesc"
                :search="search"
                @click:row="$emit('click:row', $event)"
        >
            <template v-slot:item.preAction="{ item }">
                <slot name="item.preAction" :item="item"></slot>
            </template>

            <template v-slot:item.action="{ item }">
                <slot name="item.action" :item="item">
                    <v-icon
                            v-if="editPermission && checkPermission(editPermission)"
                            small
                            class="mr-2"
                            @click.stop="editItem(item)"
                    >
                        edit
                    </v-icon>

                    <v-icon
                            v-if="dropPermission && checkPermission(dropPermission)"
                            small
                            @click.stop="openDropEntityDialog(item)"
                    >
                        delete
                    </v-icon>
                </slot>
            </template>

            <template v-slot:item.extraAction="{ item }">
                <slot name="item.extraAction" :item="item"></slot>
            </template>
        </v-data-table>
    </v-card>
</template>


<script>
    import { jsonEquals } from '../../utils/base';


    export default {
        props: {
            tableTitle: {
                type: String,
                default: ''
            },
            headers: Array,
            defaultItem: Object,
            defaultCreateItem: Object,
            defaultParams: {},
            haveSearch: {
                type: Boolean,
                default: true
            },
            filters: {
                type: Object,
                default: null
            },
            initSortBy: {},
            initSortDesc: {},
            initLimit: {},

            showTable: {
                type: Boolean,
                default: true
            },

            createPermission: String,
            editPermission: String,
            dropPermission: String,

            _getData: Function,
            _mapDataItem: Function,
            _getItem: Function,
            _createItem: Function,
            _editItem: Function,
            _dropItem: Function,
            entityDialogTitle: Function,
            dropEntityDialogTitle: Function,

            onEditItem: Function
        },

        data: () => ({
            loading: false,
            items: [],
            totalCount: 0,
            limit: 10,
            page: 1,
            sortBy: [ 'id' ],
            sortDesc: [ true ],
            search: '',

            entityDialog: false,
            editingId: null,
            entityItem: {},
            savingEntityDialog: false,

            dropEntityDialog: false,
            dropEntityId: null,
            dropEntityItem: {}
        }),

        watch: {
            page(val, prev) {
                if (!jsonEquals(val, prev)) this.getData();
            },
            limit(val, prev) {
                if (!jsonEquals(val, prev)) this.getData();
            },
            sortBy(val, prev) {
                if (!jsonEquals(val, prev)) this.getData();
            },
            sortDesc(val, prev) {
                if (!jsonEquals(val, prev)) this.getData();
            },

            search() { this.getData(); },
            filters: {
                deep: true,
                handler() { this.getData(); }
            },
            defaultParams: {
                deep: true,
                handler() { this.getData(); }
            },

            entityDialog (val) {
                if (val) {
                    if (!this.editingId) {  /// Create new entity item
                        this.entityItem = Object.assign({}, this.defaultItem, this.defaultCreateItem);
                    }
                } else {
                    this.editingId = null;
                }
            },
        },

        methods: {
            getPagination() {
                const { limit, page } = this;

                return { limit, page };
            },

            getSorting() {
                const [ sortBy ] = this.sortBy;
                const [ sortDesc ] = this.sortDesc;

                if (!sortBy) return null;

                return Object.assign({ sortBy }, sortDesc && { desc: 1 });
            },

            getSearch() {
                const { search } = this;

                return search && { search };
            },

            getFilters() {
                const { filters } = this;

                return filters
                    && Object.keys(filters)
                        .filter(key => !!filters[key])
                        .reduce((prev, key) => Object.assign(prev, { [key]: filters[key] }), {});
            },

            getDefaultParams() {
                const { defaultParams } = this;

                return defaultParams
                    && Object.keys(defaultParams)
                        .filter(key => !!defaultParams[key])
                        .reduce((prev, key) => Object.assign(prev, { [key]: defaultParams[key] }), {});
            },

            getParams() {
                return Object.assign(
                    {},
                    this.getDefaultParams(),
                    this.getPagination(),
                    this.getSorting(),
                    this.getSearch(),
                    this.getFilters(),
                );
            },

            async getData() {
                try {
                    this.loading = true;
                    const response = await this._getData( this.getParams() );

                    this.items = this._mapDataItem
                        ? response.data.items.map(item => this._mapDataItem(item))
                        : response.data.items;
                    this.totalCount = response.data.count;

                    this.$emit('update:items', this.items);
                } finally {
                    this.loading = false;
                }

            },

            async __editItem (item) {
                this.editingId = item.id;

                const response = await this._getItem( item.id );

                this.entityItem = Object.assign({}, this.defaultItem, this.defaultCreateItem, response.data);
                this.entityDialog = true;
            },

            editItem (item) {
                if (this.onEditItem) {
                    this.onEditItem(item);
                } else {
                    this.__editItem(item);
                }
            },

            async openDropEntityDialog (item) {
                this.dropEntityId = item.id;

                const response = await this._getItem( item.id );

                this.dropEntityItem = Object.assign({}, this.defaultItem, this.defaultCreateItem, response.data);
                this.dropEntityDialog = true;

            },

            async deleteItem () {
                await this._dropItem( this.dropEntityId );
                this.dropEntityDialog = false;
                await this.getData();
            },

            async saveEntity () {
                try {
                    const { editingId, entityItem } = this;

                    if (this.savingEntityDialog) return;    /// cause can double submit Form
                    this.savingEntityDialog = true;

                    if (editingId) {
                        await this._editItem(editingId, entityItem);
                    } else {
                        await this._createItem(entityItem);
                    }

                    this.entityDialog = false;
                    this.savingEntityDialog = false;

                    await this.getData();
                } finally {
                    this.savingEntityDialog = false;
                }
            },
        },

        mounted() {
            this.sortBy = this.initSortBy || [ 'id' ];
            this.sortDesc = this.initSortDesc || [ true ];
            this.limit = this.initLimit || 10;

            this.getData();
        }
    }
</script>
