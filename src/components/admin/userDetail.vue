<template>
    <div>
        <router-view></router-view>
        <v-btn color="blue-grey lighten-2" to="/app/users" class="mt-10 ml-10">
            back <v-icon right>arrow_back </v-icon>
        </v-btn>
        <v-container>
            <v-row>
                <v-col cols="12" lg="6" md="6" sm="12">
                    <v-card>
                        <v-card-title class="d-flex justify-center grey-text">Update User</v-card-title>
                        <v-divider class="mb-5"></v-divider>
                        <v-row class="d-flex justify-center py-5">
                            <v-col cols="10">
                                <v-text-field v-model="userDetali.name" label="Full Name" placeholder="Full Name" dense
                                    outlined>
                                </v-text-field>
                                <v-text-field v-model="userDetali.email" label="Email" placeholder="E-mail" dense
                                    outlined>
                                </v-text-field>
                                <template v-if="show">
                                <small class="red--text" small> {{error}}</small>
                                </template>

                            </v-col>
                            <v-col cols="10">
                                <v-btn block class="primary mb-10" type="submit" :loading="loading" @click="update()">
                                    update
                                    <v-icon right>update</v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
                <v-col cols="12" lg="6" md="12" sm="3">
                    <v-card class="py-10">
                        <v-card-title class="d-flex justify-center">
                            Reset Password
                        </v-card-title>
                        <v-divider class="mx-3 mb-5"></v-divider>
                        <reset-password :userDetail="userDetali"></reset-password>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <alert-message-vue></alert-message-vue>
    </div>
</template>

<script>
    import {
        Bus
    } from '../../main'
    import alertMessageVue from '../alertMessage.vue'
    import resetPassword from '../Signup/resetPassword.vue'
    import {
        mapGetters,
        mapActions
    } from 'vuex'
    export default {
        components: {
            resetPassword,
            alertMessageVue
        },
        data() {
            return {
                selectedItem: 1,
                error: '',
                loading:false,
                show:false,
                items: [{
                        text: 'Real-Time',
                        icon: 'mdi-clock'
                    },
                    {
                        text: 'Audience',
                        icon: 'mdi-account'
                    },
                    {
                        text: 'Conversions',
                        icon: 'mdi-flag'
                    },
                ],
            }
        },
        computed: {
            ...mapGetters({
                userDetali: 'userMan/userDetali',
                userStudents: 'userMan/userStudents'
            })
        },
        methods: {
            ...mapActions({
                getUserDetail: 'userMan/getUserDetail',
                getUserStudents: 'userMan/getUserStudents',
                updateUser: 'userMan/updateUser'

            }),

            update() {
                this.show=false;
                this.loading=true;
                this.updateUser(this.userDetali).then(() => {
                    Bus.$emit('showalert', 'user data updated ')
                    this.loading=false
                }).catch((err)=>{
                    this.loading=false;
                    this.error=err.response.data.errors.email[0];
                    this.show=true;
                })
            }
            
        },
        created() {
            this.getUserDetail(this.$route.params.id)
            this.getUserStudents(this.$route.params.id)
        }
    }
</script>