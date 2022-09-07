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
                            <span class="headline">Student Detail</span>
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
                                            <v-text-field v-model="student.birthDate" label="Picker in menu"
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
                                        <template v-if="student.courses">
                                            <v-select :items="courses.data" v-model="student.courses[0].pivot.course_id"
                                                item-text="name" item-value="id" label="Course" persistent-hint
                                                single-line></v-select>
                                        </template>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-select :items="sections.data" @change="sectionaction"
                                            v-model="student.section_id" item-text="name" item-value="id"
                                            label="Section" persistent-hint single-line></v-select>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4>
                                        <v-select :items="usersList.data" v-model="student.user_id" item-text="name"
                                            item-value="id" label="Assign Teacher" persistent-hint single-line>
                                        </v-select>
                                    </v-flex>

                                </v-layout>
                            </v-container>
                            <small>*indicates required field</small>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn color="blue darken-1" :loading="loading" @click="update">update
                                <v-icon right>update</v-icon>
                            </v-btn>
                            <v-btn color="error" class="d-flex justify-end" @click="deleteStu(student.id)"
                                :loading="deleteLoading">delete
                                <v-icon right>delete</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-layout>
            </v-container>
        </v-container>
        <alert-message-vue></alert-message-vue>
    </div>
</template>

<script>
    import router from '../../router'
    import {
        Bus
    } from '../../main'
    import alertMessageVue from "../alertMessage.vue";
    import {
        mapGetters,
        mapActions
    } from "vuex";
    export default {
        components: {
            alertMessageVue
        },
        data() {
            return {
                loading: false,
                menu: false,
                deleteLoading: false,
                fd: {},
                date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                    .toISOString()
                    .substr(0, 10),

            };
        },
        computed: {
            ...mapGetters({
                sections: "section/sections",
                courses: "courses/courses",
                usersList: 'auth/usersList',
                student: 'student/student',
                user: 'auth/user'
            }),
        },
        methods: {
            ...mapActions({
                getSections: "section/getSections",
                getCourses: "courses/getCourses",
                getUsersList: 'auth/getUsersList',
                addStudent: 'student/addStudent',
                getStudent: 'student/getStudent',
                updateStudent: 'student/updateStudent',
                DeleteStudent: 'student/DeleteStudent'


            }),
            sectionaction(e) {
                console.log(e)
            },
            update() {
                this.fd.id = this.student.id;
                this.fd.fullName = this.student.fullName;
                this.fd.chName = this.student.chName;
                this.fd.motherName = this.student.motherName;
                this.fd.phoneNumber = this.student.phoneNumber;
                this.fd.birthDate = this.student.birthDate;
                this.fd.city = this.student.city;
                this.fd.wereda = this.student.wereda;
                this.fd.kebele = this.student.kebele;
                this.fd.houseNumber = this.student.houseNumber;
                this.fd.sex = this.student.sex;
                this.fd.schoolName = this.student.schoolName;
                this.fd.grade = this.student.grade;
                this.fd.user_id = this.student.user_id;
                this.fd.course_id = this.student.courses[0].pivot.course_id;
                this.fd.section_id = this.student.section_id;
                this.loading = true;
                // console.log(this.fd)
                this.updateStudent(this.fd).then(() => {
                    this.loading = false
                    Bus.$emit('showalert', 'data updated successfuly !')
                }).catch((err) => {
                    this.loading = false;
                    console.log(err.response.data)
                })
            },
            changeRoute() {
                if(this.user.role == "user") {
                    router.push('/app/myStudents');
                } else if (this.user.role == "admin") {
                    router.push('/app/ManageStudent');
                    Bus.$emit('alertMessage','student deleted')
                }
            },
            deleteStu(id) {
                this.deleteLoading = true;
                if (confirm("Press OK to delete student !") == true) {
                    this.DeleteStudent(id).then(() => {
                        this.deleteLoading = false;
                        this.changeRoute()
                    }).catch((err) => {
                        this.deleteLoading = false;
                        console.log(err.response.data)
                    })

                } else {
                    this.text = "You canceled!";
                    this.deleteLoading = false;

                }





            }
        },
        created() {
            this.getStudent(this.$route.params.id)
            this.getSections();
            this.getCourses();
            this.getUsersList();
        },
    }
</script>