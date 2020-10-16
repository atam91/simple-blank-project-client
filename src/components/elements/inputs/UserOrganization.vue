<template>
    <w-combobox v-if="checkPermission(ACTIONS.ANY_ORGANIZATION_ACCESS)"
                :value="value"
                @input="$emit('input', $event)"
                entity-type="organizations"
                :label="label"
                filter
                :disabled="disabled"/>

    <v-select v-else
              :value="value"
              @input="$emit('input', $event)"
              :items="items"
              :label="label"
              hide-details
              :disabled="disabled" />
</template>


<script>
    import { mapGetters } from 'vuex';
    import shortEntityTextMappers from '../../../helpers/shortEntityTextMappers';


    export default {
        props: {
            value: {},
            disabled: {
                type: Boolean,
                default: false
            },
            label: {
                type: String,
                default: 'Organization'
            },
        },

        computed: {
            ...mapGetters([ 'organization' ]),

            items() {
                const { organization } = this;

                return [
                    organization && {
                        value: organization.id,
                        text: shortEntityTextMappers.organizations(organization)
                    },
                ].filter(v => v);
            },
        },

        watch: {
            organization: {
                handler: function() {
                    const { organization } = this;

                    organization && this.$emit('input', organization.id);
                },
                immediate: true
            },
        },
    };
</script>
