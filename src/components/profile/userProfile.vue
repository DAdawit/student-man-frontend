<template>
    <div>
        <br>
        <v-card class="mx-auto" max-width="1000" tile>
            <v-img height="200" src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg"></v-img>
            <v-row style="margin:2.5%;position:absolute; top: 130px">

                <v-list-item>
                    <v-list-item-avatar size="100">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2rPjg1pU-CRZf3jcO6C3ienl5dul4phKLgAlnGB40nQ&s" alt="John">
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title class="title" style="margin-top:20px;">{{user.name}}
                        </v-list-item-title>
                        <v-list-item-subtitle>{{user.email}} | {{user.role}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-row>
        </v-card>
        <v-row>
            <v-col class="d-flex justify-end">
                <div class="mt-10 mr-10">
                <change-password-vue></change-password-vue>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import changePasswordVue from '../Signup/changePassword.vue';
    import {
        mapGetters
    } from 'vuex'
    export default {
        components:{
            changePasswordVue
        },
        data() {
            return {

            }
        },
        computed: {
            ...mapGetters({
                user: 'auth/user'
            })
        }
    }
</script>