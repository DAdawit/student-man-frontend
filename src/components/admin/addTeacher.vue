<template>
    <div class="text-center">
        <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" v-bind="attrs" v-on="on">
                    Add user
                    <v-icon right>add</v-icon>
                </v-btn>
            </template>

            <v-card>
                <v-card-title class="text-h5 d-flex justify-center grey--text">
                    Add User
                </v-card-title>
                <v-divider></v-divider>

                <v-card-text>
                    <div class="d-flex justify-center">
                        <form @submit="signup">
                            <!-- <v-row class="d-flex justify-center pt-5">
        </v-row> -->
                            <v-row class="d-flex justify-center py-5">
                                <v-col cols="10">
                                    <v-text-field v-model="user.name" label="Full Name" placeholder="Full Name" dense
                                        outlined>
                                    </v-text-field>
                                    <v-text-field v-model="user.email" label="Email" placeholder="E-mail" dense
                                        outlined>
                                    </v-text-field>
                                    <small class="red--text" small> {{error}}</small>
                                    <v-text-field v-model="user.password" label="password" placeholder="Password" dense
                                        outlined :type="show1 ? 'text' : 'password'"
                                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" @click:append="show1 = !show1">
                                    </v-text-field>
                                    <v-text-field v-model="user.password_confirmation" label="Confirm Password"
                                        placeholder="Confirm Password" dense outlined
                                        :type="show1 ? 'text' : 'password'"
                                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" @click:append="show1 = !show1">
                                    </v-text-field>
                                    <!-- <router-link to="/forgetPassword" class="d-flex justify-end"><small>forget
                                            password?</small></router-link> -->
                                </v-col>
                                <template v-if="showError">

                                    <template v-if="errors.email != null">
                                        <small class="red--text" small> {{errors.email[0]}}</small>
                                    </template>
                                    <br>
                                    <template v-if="errors.password">
                                        <small class="red--text" small> {{errors.password[0]}}</small>
                                    </template>

                                </template>
                                <v-col cols="10">
                                    <v-btn block class="primary mb-10" type="submit" :loading="loading">Register
                                        <v-icon right>person_add</v-icon>

                                    </v-btn>
                                </v-col>
                            </v-row>
                        </form>
                    </div>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>



<script>
    import {
        mapActions
    } from 'vuex';
    export default {
        data() {
            return {
                loading: false,
                show1: false,
                user: {
                    name: 'girma',
                    email: 'girma@gmail.com',
                    password: 'pass',
                    password_confirmation: 'pass1'

                },
                dialog: false,
                error: '',
                emailerror: '',
                showError: false,
                erros: {
                    email: null,
                    password: null
                }
            }
        },

        methods: {
            ...mapActions({
                registerUser: 'auth/registerUser'
            }),
            signup(e) {
                e.preventDefault();
                this.loading = true
                this.registerUser(this.user).then(() => {
                    this.dialog = false
                    this.loading = false
                }).catch((err) => {
                    this.showError = true
                    this.loading = false
                    this.errors = err.response.data.errors
                    console.log(err.response.data.errors)

                })
            }
        }
    }
</script>