<template>
    <div>
        <v-btn v-if="user.role == 'admin'" color="blue-grey lighten-2" to="/app/ManageStudent" class="mt-10 ml-10">
            back <v-icon right>arrow_back </v-icon>
        </v-btn>
        <v-btn v-if="user.role == 'user'" color="blue-grey lighten-2" to="/app/myStudents" class="mt-10 ml-10">
            back <v-icon right>arrow_back </v-icon>
        </v-btn>
        <v-container class="mt-5">
            <v-container>
                <v-layout row justify-center>
                    <v-card>
                        <v-card-title>
                            <span class="headline">Add Student</span>
                        </v-card-title>
                        <v-card-text>

                            <v-container grid-list-md>
                                <v-layout wrap>

                                    <v-flex xs12 sm6 md4>
                                        <v-text-field label="Full Name" v-model="student.fullName" required>
                                        </v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-text-field label="Cristianity Name" v-model="student.chName"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-text-field label="Mother Name" v-model="student.motherName" required>
                                        </v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-text-field label="Phone Number" v-model="student.phoneNumber" required>
                                        </v-text-field>
                                    </v-flex>
                                    <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
                                        :return-value.sync="student.birthDate" transition="scale-transition" offset-y
                                        min-width="auto">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field v-model="student.birthDate" label="birth date"
                                                prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on">
                                            </v-text-field>
                                        </template>
                                        <v-date-picker v-model="student.birthDate" no-title scrollable>
                                            <v-spacer></v-spacer>
                                            <v-btn text color="primary" @click="menu = false">
                                                Cancel
                                            </v-btn>
                                            <v-btn text color="primary" @click="$refs.menu.save(student.birthDate)">
                                                OK
                                            </v-btn>
                                        </v-date-picker>
                                    </v-menu>
                                    <v-flex xs12 sm6 md4>
                                        <v-text-field label="City" v-model="student.city" required></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-text-field label="Wereda" v-model="student.wereda" required></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-text-field label="Kebele" v-model="student.kebele" required></v-text-field>
                                    </v-flex>

                                    <v-flex xs12 sm6 md4>
                                        <v-text-field label="House Number" v-model="student.houseNumber"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-select v-model="student.sex" label="Sex" required
                                            :items="['Male', 'Female']">
                                        </v-select>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-text-field label="School Name" v-model="student.schoolName" required>
                                        </v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-text-field label="Grade" v-model="student.grade" required></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-select :items="courses" v-model="student.course_id" item-text="name"
                                            item-value="id" label="Course" persistent-hint single-line></v-select>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-select :items="sections" v-model="student.section_id" item-text="name"
                                            item-value="id" label="Section" persistent-hint single-line></v-select>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4 v-if="user.role == 'user'">
                                        <v-select :items="usersList" v-model="user.id" item-text="name" disabled
                                            item-value="id" label="Assign Teacher" persistent-hint single-line>
                                        </v-select>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4 v-else>
                                        <v-select :items="usersList" v-model="student.user_id" item-text="name"
                                            item-value="id" label="Assign Teacher" persistent-hint single-line>
                                        </v-select>
                                    </v-flex>

                                </v-layout>
                            </v-container>
                            <small>*indicates required field</small>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn color="blue darken-1" :loading="loading" @click="save">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-layout>
            </v-container>
        </v-container>
        <alert-message-vue></alert-message-vue>
    </div>
</template>

<script>
    import {
        Bus
    } from '../../main'
    import alertMessageVue from "../alertMessage.vue";
    import {
        mapGetters,
        mapActions
    } from "vuex";
    // import router from '@/router';
    export default {
        components: {
            alertMessageVue
        },
        data() {
            return {
                loading: false,
                menu: false,
                date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                    .toISOString()
                    .substr(0, 10),
                student: {
                    fullName: 'kasu man  girma ',
                    chName: 'mmmmvmmmv mmm',
                    motherName: 'kasech man',
                    phoneNumber: '0936207512',
                    birthDate: new Date().toISOString().substr(0, 10),
                    city: 'addis ababa',
                    wereda: '08',
                    kebele: '08',
                    houseNumber: '856',
                    sex: 'Male',
                    schoolName: 'beza',
                    grade: '8',
                    user_id: '3',
                    course_id: '2',
                    section_id: '2',
                },
            };
        },
        computed: {
            ...mapGetters({
                sections: "section/sections",
                courses: "courses/courses",
                usersList: 'auth/usersList',
                user: 'auth/user'
            }),
        },
        methods: {
            ...mapActions({
                getSections: "section/getSections",
                getCourses: "courses/getCourses",
                getUsersList: 'auth/getUsersList',
                addStudent: 'student/addStudent'
            }),
            save() {
                console.log(this.student)
                this.addStudent(this.student).then(() => {
                    this.loading = false;
                    Bus.$emit('showalert', 'student added successfuly !')
                    if (this.user.role == 'user') {
                        // router.push('/app/myStudents')
                    } else if (this.user.role == 'adimn') {
                        // router.push('/app/ManageStudent')
                    }
                }).catch((err) => {
                    console.log(err.response.data)
                })
            }
        },
        created() {
            this.getSections();
            this.getCourses();
            this.getUsersList();

        },
    };
</script>