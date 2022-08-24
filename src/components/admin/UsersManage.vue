<template>
    <div>
        <!-- <router-view></router-view> -->
        <v-card flat>
            <v-card-title class="text-center justify-start py-6">
                <h1 class="subheading grey--text mb-5">Users and Account management</h1>
            </v-card-title>
        </v-card>
        <v-container>
            <v-row>
                <v-col cols="12" class="d-flex justify-end">
                    <add-teacher-vue></add-teacher-vue>
                </v-col>
            </v-row>
        </v-container>

        <!-- search user -->
        <v-container>
            <v-row>
                <v-col placeholder="type full name ..." class="d-flex justify-content-center mx-10">
                    <v-text-field outlined label="search" block prepend-inner-icon="search" v-model="fullname"></v-text-field>
                </v-col>
            </v-row>
        </v-container>

        <v-container v-if="searching == true">
            <p> {{searchReasult.length}} number of results </p>

            <v-simple-table fixed-header class="elevation-1" loading-text="Loading... Please wait">
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left">#ID</th>
                            <th class="text-left">Image</th>
                            <th class="text-left">Name</th>
                            <th class="text-left">Email</th>
                            <th class="text-left">Role</th>
                            <th class="text-left">Created_at</th>
                            <th class="text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(user, index) in searchReasult" :key="user.id">
                            <td>{{index+1}}</td>
                            <td>
                                <v-avatar size="50">
                                    <img src="https://img.freepik.com/free-vector/modern-people-avatar-casual-clothes-vector-cartoon-illustration-man-with-individual-face-hair-light-digital-frame-dark-blue-computer-picture-web-profile_107791-4257.jpg?w=740&t=st=1659037184~exp=1659037784~hmac=67f0d3b0164ba7060aa046d5b663053ef879eb6bb12d7c11ba6aedfdc5377a32"
                                        alt="John">
                                </v-avatar>
                            </td>
                            <td>{{ user.name}}</td>
                            <td>{{ user.email }}</td>
                            <td>{{ user.role }}</td>
                            <td>{{ moment(user.created_at).format("YYYY-MM-DD") }}</td>
                            <td>
                                <v-btn small outlined color="info" :to="{name:'userDetail',params:{id: user.id}}"> show
                                    <v-icon right router> visibility </v-icon>
                                </v-btn>
                            </td>

                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-container>






        <!--  -->

        <v-container v-if="searching == false">
            <v-chip color="primary" class="mb-2">{{users.current_page}} out of {{users.last_page}} pages</v-chip>

            <v-simple-table fixed-header class="elevation-1" loading-text="Loading... Please wait">
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left">#ID</th>
                            <th class="text-left">Image</th>
                            <th class="text-left">Name</th>
                            <th class="text-left">Email</th>
                            <th class="text-left">Role</th>
                            <th class="text-left">Created_at</th>
                            <th class="text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(user, index) in users.data" :key="user.id">
                            <td>{{index+1}}</td>
                            <td>
                                <v-avatar size="50">
                                    <img src="https://img.freepik.com/free-vector/modern-people-avatar-casual-clothes-vector-cartoon-illustration-man-with-individual-face-hair-light-digital-frame-dark-blue-computer-picture-web-profile_107791-4257.jpg?w=740&t=st=1659037184~exp=1659037784~hmac=67f0d3b0164ba7060aa046d5b663053ef879eb6bb12d7c11ba6aedfdc5377a32"
                                        alt="John">
                                </v-avatar>
                            </td>
                            <td>{{ user.name}}</td>
                            <td>{{ user.email }}</td>
                            <td>{{ user.role }}</td>
                            <td>{{ moment(user.created_at).format("YYYY-MM-DD") }}</td>
                            <td>
                                <v-btn small outlined color="info" :to="{name:'userDetail',params:{id: user.id}}"> show
                                    <v-icon right router> visibility </v-icon>
                                </v-btn>
                            </td>

                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-container>
        <div v-if="searching == false">
            <div class="text-center">
                <v-pagination v-model="current_page" :length="last_page" :total-visible="5" circle></v-pagination>
            </div>
        </div>

    </div>
</template>
<script>
    import axios from 'axios'
    import addTeacherVue from './addTeacher.vue'
    import {
        mapGetters,
        mapActions
    } from 'vuex'
    export default {
        components: {
            addTeacherVue
        },
        data: () => ({
            loading: false,
            current_page: 1,
            total: 0,
            last_page: 0,
            users: {},
            fullname: '',
            searching: false,
            searchReasult:{}
        }),
        computed: {
            ...mapGetters({
                usersList: 'auth/usersList'
            })
        },
        methods: {
            ...mapActions({
                // getUsersList: 'auth/getUsersList'
            }),
            async getusers() {
                await axios.get(`/allUsers?page=${this.current_page}`).then((res) => {
                    this.users = res.data;
                    this.current_page = res.data.current_page;
                    this.last_page = res.data.last_page;
                })
            },
            editUser(id) {
                console.log('edit user', id)
            },
            deleteUser(id) {
                console.log('delete user', id)
            }
        },
        watch: {
            current_page(newpage) {
                this.current_page = newpage
                this.getusers()
            },
            async fullname(newval) {
                if (newval.length > 3) {
                    this.searching = true;
                    await axios.get(`/searchUser/${newval}`).then((res) => {
                        console.log(res.data)
                        this.searchReasult = res.data
                    })
                } else {
                    this.searching = false;
                }
            }
        },
        created() {
            // this.getUsersList();
            this.getusers();
        }
    }
</script>