<template>
    <div>
        <v-list-item>
            <v-list-item-avatar>
                <v-icon>person</v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
                <v-list-item-title>
                    {{ user.name }}
                </v-list-item-title>
                <v-list-item-subtitle>
                    {{user.email}}
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                    {{user.role}}
                </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <v-list>
            <v-list-item v-for="item in items" :key="item.title" router :to="item.route">
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

        </v-list>
    </div>

</template>
<script>
    import {
        mapGetters
    } from 'vuex'
    export default {
        data() {
            return {
                items: [{
                        title: 'Dashboard',
                        icon: 'mdi-view-dashboard',
                        route: '/app/dashboard'
                    },
                    {
                        title: 'Manage Account',
                        icon: 'mdi-account-box',
                        route: '/app/users'
                    },
                    {
                        title: 'Manage Section',
                        icon: 'add_home',
                        route: '/app/manageSection'
                    },
                    {
                        title: 'Add Course',
                        icon: 'class',
                        route: '/app/course'
                    },
                    {
                        title: 'Manage Student',
                        icon: 'group',
                        route: '/app/ManageStudent'
                    },
                ],
            }
        },

        computed: {
            ...mapGetters({
                user: 'auth/user'
            })
        },
        methods: {

        }
    }
</script>