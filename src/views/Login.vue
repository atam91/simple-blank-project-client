<template>
        <v-content>
            <v-container class="fill-height" fluid>
                <v-row align="center" justify="center">
                    <v-col cols="12" sm="8" md="4">

                        <v-card elevation="12">
                            <v-toolbar
                                    color="primary"
                                    dark
                                    flat
                            >
                                <v-toolbar-title>Authentication</v-toolbar-title>
                            </v-toolbar>

                            <v-form @submit.prevent="onSubmit">
                                <v-card-text>
                                    <v-text-field
                                            label="Login"
                                            name="login"
                                            prepend-icon="person"
                                            type="text"
                                            v-model="login"
                                    />

                                    <v-text-field
                                            id="password"
                                            label="Password"
                                            name="password"
                                            prepend-icon="lock"
                                            type="password"
                                            v-model="password"
                                    />
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer />
                                    <v-btn color="primary" :loading="loading" type="submit">Login</v-btn>
                                </v-card-actions>
                            </v-form>
                        </v-card>

                    </v-col>
                </v-row>
            </v-container>
        </v-content>
</template>


<script>

    export default {
        data: () => ({
            login: '',
            password: '',
            loading: false
        }),

        methods: {
            onSubmit () {
                const { login, password } = this;
                if (!login || !password) return;

                this.loading = true;
                this.$store.dispatch('login', { login, password })
                    .then(user => {
                        this.$router.push('/authed');
                    })
                    .catch(err => {
                        this.password = '';
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            }
        }
    }
</script>
