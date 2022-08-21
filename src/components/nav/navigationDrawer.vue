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

        <v-list v-if="user.role=='admin'">
            <v-list-item v-for="item in admins" :key="item.title" router :to="item.route">
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

        </v-list>
        <v-list v-if="user.role=='user'">
            <v-list-item v-for="item in users" :key="item.title" router :to="item.route">
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
                admins: [{
                        title: 'Dashboard',
                        icon: 'mdi-view-dashboard',
                        route: '/app/dashboard'
                    },
                    {
                        title: 'Manage Account',
                        icon: 'mdi-account-box',
                        route: '/app/users',
                        role: 'admin'
                    },
                    {
                        title: 'Manage Section',
                        icon: 'add_home',
                        route: '/app/manageSection',
                        role: 'admin'
                    },
                    {
                        title: 'Add Course',
                        icon: 'class',
                        route: '/app/course',
                        role: 'admin'
                    },
                    {
                        title: 'Manage Student',
                        icon: 'group',
                        route: '/app/ManageStudent'
                    },
                ],
                users: [{
                        title: 'Dashboard',
                        icon: 'mdi-view-dashboard',
                        route: '/app/dashboard'
                    },

                    {
                        title: 'My Students',
                        icon: 'group',
                        route: '/app/myStudents'
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