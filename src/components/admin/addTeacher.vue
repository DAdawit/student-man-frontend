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
                        <ValidationObserver v-slot="{ handleSubmit }">
                            <form @submit.prevent="handleSubmit(signup)">
                                <v-row class="d-flex justify-center py-5">
                                    <v-col cols="10">
                                        <ValidationProvider rules="required" name="Full Name" v-slot="{ errors }">
                                            <v-text-field v-model="user.name" label="Full Name" placeholder="Full Name"
                                                dense outlined :error="errors.length > 0" :error-messages="errors[0]">
                                            </v-text-field>
                                        </ValidationProvider>

                                        <ValidationProvider rules="required|email" name="Email" v-slot="{ errors }">
                                            <v-text-field v-model="user.email" label="Email" placeholder="E-mail" dense
                                                outlined :error="errors.length > 0" :error-messages="errors[0]">
                                            </v-text-field>
                                        </ValidationProvider>
                                        <ValidationProvider rules="required" name="password" v-slot="{ errors }">
                                            <v-text-field v-model="user.password" label="password" ref="password"
                                                placeholder="Password" dense outlined :error="errors.length > 0"
                                                :error-messages="errors[0]" :type="show1 ? 'text' : 'password'"
                                                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                                @click:append="show1 = !show1">
                                            </v-text-field>
                                        </ValidationProvider>
                                        <ValidationProvider rules="required|confirmed:password" name="confirm password"
                                            v-slot="{ errors }">
                                            <v-text-field  label="Confirm Password"  v-model="user.password_confirmation"
                                                placeholder="Confirm Password" dense outlined
                                                :type="show1 ? 'text' : 'password'"
                                                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                                @click:append="show1 = !show1" :error="errors.length > 0"
                                                :error-messages="errors[0]">
                                            </v-text-field>
                                        </ValidationProvider>
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
                        </ValidationObserver>
                    </div>
                </v-card-text>
            </v-card>
        </v-dialog>
        <alert-message-vue></alert-message-vue>
    </div>
</template>



<script>
    import {
        Bus
    } from '../../main'
    import alertMessageVue from '../alertMessage.vue';
    import {
        mapActions
    } from 'vuex';
    export default {
        components: {
            alertMessageVue
        },

        data() {
            return {
                loading: false,
                show1: false,
                user: {
                    name: '',
                    email: '',
                    password: '',
                    password_confirmation: ''
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
            signup() {
                this.loading = true
                this.registerUser(this.user).then(() => {
                    this.dialog = false
                    this.loading = false
                    Bus.$emit('showalert', 'New user added')
                    Bus.$emit('fetchUsers')
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