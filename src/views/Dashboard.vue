<template>
    <div>
        <v-card>
            <v-simple-table>
                <template>
                    <tbody>
                        <tr>
                            <td># id</td>
                            <td>{{ user.id }}</td>
                        </tr>
                        <tr>
                            <td>Login</td>
                            <td>{{ user.login }}</td>
                        </tr>
                        <tr>
                            <td>Role</td>
                            <td>{{ user.role }}</td>
                        </tr>

                        <tr v-if="organization">
                            <td>Organization</td>
                            <td>{{ organizationText }}</td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-card>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import shortEntityTextMappers from '../helpers/shortEntityTextMappers';

    export default {
        name: 'Dashboard',

        computed: {
            ...mapGetters([ 'user', 'organization' ]),

            organizationText() {
                const { organization } = this;

                return organization && shortEntityTextMappers.organizations(organization);
            }
        },
    }
</script>

