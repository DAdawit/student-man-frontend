<template>
    <div>
        <v-app-bar app color="primary" dark flat>
            <v-app-bar-nav-icon fab class="white mr-10" small text color="black" @click.stop="drawer = !drawer">
            </v-app-bar-nav-icon>
            <div class="d-flex align-center">
                <v-img alt="Vuetify Logo" class="shrink mr-2" to="/" contain
                    src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png" transition="scale-transition"
                    width="40" />

                <v-img alt="Vuetify Name" class="shrink mt-1 hidden-sm-and-down" contain min-width="100"
                    src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png" width="100" />
            </div>

            <v-spacer></v-spacer>
            <template>
                <SignUp v-if="auth == null"></SignUp>

                <v-btn v-else color="white" outlined depressed @click="logout()">
                    logout
                    <v-icon small right>logout</v-icon>
                </v-btn>
            </template>
        </v-app-bar>
        <v-navigation-drawer app  left permanent v-if="auth !== null">
            <navigation-drawer-vue />

            
            <template v-slot:append>
                <div class="pa-2 d-flex justify-content-center">
                    <v-btn block outlined @click="logout()">
                        Logout
                        <v-icon right>logout</v-icon>
                    </v-btn>
                </div>
            </template>
        </v-navigation-drawer>
    </div>
</template>

<script>
    // import router from '../../router'
    import navigationDrawerVue from './navigationDrawer.vue'
    import {
        mapGetters,
        mapActions
    } from 'vuex'
    import SignUp from '../signUp.vue'

    export default {
        data() {
            return {
                drawer: false
            }
        },
        components: {
            SignUp,
            navigationDrawerVue
        },
        computed: {
            ...mapGetters({
                auth: 'auth/token'
            })
        },
        methods: {
            ...mapActions({
                logoutUser: 'auth/logoutUser'
            }),
            logout() {
                this.logoutUser().then(() => {
                    console.log('logout');
                    this.$router.push({
                        path: "/"
                    });
                    window.location.reload()
                })
            }
        }
    }
</script>