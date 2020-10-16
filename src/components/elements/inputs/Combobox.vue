<template>
    <v-combobox :value="shownValue"
                :search-input.sync="searchQuery"
                :label="label"
                :disabled="disabled"
                :items="searchItems"
                @input="onValueInput"
                :rules="rules"
                :clearable="filter"
                :hide-details="filter"
                :loading="loading"
                :class="{ 'filter-item': filter }"
    >
    </v-combobox>
</template>


<script>
    import _debounce from 'lodash/debounce';
    import { filterObject } from '../../../utils/base';

    export default {
        name: 'combobox',

        props: {
            raw: {},
            value: {},
            startSearch: {},
            defaultParams: Object,
            label: String,
            itemsGetter: {
                type: Function,
                required: true
            },
            itemsMapper: {
                type: Function,
                default: v => v
            },
            rules: Array,
            filter: {
                type: Boolean,
                default: false,
            },
            disabled: {
                type: Boolean,
                default: false,
            },
        },

        data() {
            return {
                shownValue: null,
                searchQuery: '',
                searchItems: [],
                ignoreSearch: false,
                startSearched: false,
                loading: false,
            };
        },

        watch: {
            searchQuery(search) {
                if (this.ignoreSearch) {
                    this.ignoreSearch = false;
                    return;
                }
                if (typeof search === 'number') return;
                this.getSearchItems(search);
            },

            startSearch: {
                handler: function(search) {
                    if (this.startSearched) return;

                    if (search) {
                        this.getSearchItems(search);
                    }

                    this.startSearched = true;
                },
                immediate: true
            },

            defaultParams: {
                handler: function(cur, prev) {
                    if (JSON.stringify(cur) !== JSON.stringify(prev)) {
                        this.getSearchItems(this.searchQuery);
                    }
                },
                deep: true
            },

            value(value) {
                this.updateShownValue();
            }
        },

        methods: {
            onValueInput(val) {
                if (val && val.value) {
                    this.$emit('input', val.value);
                    this.$emit('update:raw', val);
                    this.$emit('update:exactMatch', true);
                    this.ignoreSearch = true;
                } else {
                    this.$emit('input', null);      ////this.$emit('input', val);     /// try fix nonExact values
                    this.$emit('update:raw', null);
                    this.$emit('update:exactMatch', false);
                }
            },

            getSearchItems (search) {
                this.loading = true;

                this.itemsGetter(
                    Object.assign({}, filterObject(this.defaultParams, v => v), { search })
                )
                    .then(res => {
                        if (res.status) {
                            this.loading = false;

                            this.searchItems = (res.data.items || res.data).map(this.itemsMapper);

                            this.updateShownValue();
                        }
                    });
            },

            updateShownValue() {
                if (!!this.value) {
                    const matched = this.searchItems.find(item => item.value === this.value);
                    if (matched) {
                        this.shownValue = matched.text;
                    } else {
                        this.shownValue = null;
                        this.$emit('input', null);
                        this.$emit('update:raw', null);
                        this.$emit('update:exactMatch', false);
                    }
                }
            },
        },

        mounted() {
            this.getSearchItems = _debounce(this.getSearchItems, 500);
        },
    };
</script>