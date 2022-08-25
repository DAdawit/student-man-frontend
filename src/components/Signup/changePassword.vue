<template>
    <div class="text-center">
        <v-dialog v-model="dialog" persistent max-width="500">
            <template v-slot:activator="{ on, attrs }">
                <v-btn  color="primary" dark v-bind="attrs" v-on="on">
                    Change Password
                    <v-icon right>build</v-icon>
                </v-btn>
            </template>

            <v-card>
                <v-card-title class="d-flex justify-center text--secondary">
                    Change password
                </v-card-title>

                <v-divider class="mx-5 mb-2"></v-divider>

                <v-form ref="registerForm" v-model="valid" lazy-validation>
                    <v-container>
                        <v-row class="d-flex justify-center">
                            <v-col cols="10" sm="10" md="10" lg="10">
                                <v-text-field v-model="userData.old_password" outlined dense 
                                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                    :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'"
                                    name="input-10-1" label="old password" hint="At least 3 characters" counter
                                    @click:append="show1 = !show1">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="10" md="10" lg="10">
                                <v-text-field v-model="userData.new_password" outlined dense
                                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                    :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'"
                                    name="input-10-1" label="new password" hint="At least 3 characters" counter
                                    @click:append="show1 = !show1">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="10" md="10" lg="10">
                                <v-text-field block v-model="password_confirmation" outlined dense
                                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                    :rules="[rules.required, passwordMatch]" :type="show1 ? 'text' : 'password'"
                                    name="input-10-1" label="verify Password" counter @click:append="show1 = !show1">
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row class="d-flex justify-content-center">
                            <p class="text-danger small overline">{{error}}</p>
                        </v-row>
                        <v-card-actions class="d-flex justify-center">
                            <v-spacer></v-spacer>
                            <v-btn color="primary" @click="dialog = false">
                                cancel
                            </v-btn>
                            <v-btn color="primary" @click="changePassword()" :disabled="!valid" :loading="loading">
                                save
                            </v-btn>
                        </v-card-actions>
                    </v-container>
                </v-form>
            </v-card>
        </v-dialog>
        <alert-message-vue></alert-message-vue>
    </div>
</template>
<script>
import alertMessageVue from '../alertMessage.vue';
import {Bus} from '../../main'
    import {
        mapGetters,
        mapActions
    } from 'vuex';
    export default {
        components:{
alertMessageVue
        },
        data() {
            return {
                rules: {
                    required: value => !!value || "Required.",
                    min: v => (v && v.length >= 3) || "Min 3 characters"
                },
                dialog: false,
                password_confirmation: "",
                valid: true,
                show: false,
                error: '',
                show1: false,
                loading: false,
                userData: {
                    old_password: 'pass',
                    new_password: 'pass',
                    password_confirmation:'pass',
                    id: ''
                }
            }
        },
        computed: {
            ...mapGetters({
                user: 'auth/user'
            }),
            passwordMatch() {
                return () => this.userData.new_password === this.password_confirmation || "Password must match";
            },
        },
        methods: {
            ...mapActions({
                changeUserPassword: 'auth/changePassword'
            }),
            changePassword() {
                this.loading = true;
                this.userData.id = this.user.id;
                this.changeUserPassword(this.userData).then(() => {
                    Bus.$emit('showalert','passwordChanged')
                    this.dialog = false;
                    this.loading = false;
                }).catch((err) => {
                    this.error = err.response.data.error;
                    this.loading = false;
                });
            }
        },
        created(){
            console.log('user props',this.userDetail);
        }
    }
</script>