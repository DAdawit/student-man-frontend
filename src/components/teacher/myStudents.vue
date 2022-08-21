<template>
    <div>
        <h1>my students</h1>
        <v-container>
            <v-row class="pr-10">
                <v-row>
                    <v-col cols="12" class="d-flex justify-end">
                        <v-btn color="primary" to="/app/addStudent">add Student <v-icon right>person_add</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-row>
        </v-container>
        <template>
            <div class="text-center">
                <v-dialog v-model="dialog" width="500" persistent>
                    <v-card>
                        <v-card-title class="text-h5 grey lighten-2 justify-center">
                            <v-icon left color="black">person</v-icon>
                            Student Detail
                        </v-card-title>

                        <v-card-text>
                            <h3 class="overline">FullName:{{studentDetail.fullName}}</h3>
                            <h3 class="caption">Ch Name:{{studentDetail.chName}}
                            </h3>
                            <h3 class="caption">Mother Name:{{studentDetail.motherName}}
                            </h3>
                            <h3 class="caption">Phone Number:{{studentDetail.phoneNumber}}
                            </h3>
                            <h3 class="caption">Address:{{studentDetail.city}}
                                w/{{studentDetail.wereda}}
                                k/{{studentDetail.kebele}}
                            </h3>
                            <h3 class="caption">House Number:{{studentDetail.houseNumber}}
                            </h3>
                            <h3 class="overline text-decoration-underline">School</h3>
                            <h3 class="caption">{{studentDetail.schoolName}} Grade {{studentDetail.grade}}</h3>

                            <h3 class="overline text-decoration-underline">Section</h3>

                            <template v-if="studentDetail.section != null">
                                <h3 class="caption">{{studentDetail.section.name}}</h3>
                            </template>
                            <h3 class="overline text-decoration-underline">Courses</h3>
                            <div v-for="(course,index) in studentDetail.courses" :key="course.id">
                                <h3 class="caption">{{index+1}},{{course.name}}
                                </h3>
                            </div>

                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn outlined color="primary" text @click="dialog = false">
                                close
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </div>
        </template>
        <v-container>
            <v-simple-table fixed-header class="elevation-1" loading-text="Loading... Please wait">
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left">#ID</th>
                            <th class="text-left">name</th>
                            <th class="text-left">phone</th>
                            <th class="text-left">city</th>
                            <th class="text-left">keble</th>
                            <th class="text-left">houseNumber</th>
                            <th class="text-left">section</th>
                            <th class="text-center" colspan="2">Actions</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(student, index) in teacherStudents.students.data" :key="student.id">
                            <td>{{index+1}}</td>
                            <td>{{ student.fullName}}</td>
                            <td>{{ student.phoneNumber}}</td>
                            <td>{{ student.city}}</td>
                            <td>{{ student.kebele}}</td>
                            <td>{{ student.houseNumber}}</td>
                            <td>{{ student.section.name}}</td>
                            <td>
                                <v-btn small color="info" outlined @click="showStudentDetail(student)">view
                                    <v-icon right small>visibility</v-icon>
                                </v-btn>
                            </td>
                            <td>
                                <v-btn outlined small color="error" router
                                    :to="{name:'updateStudent',params:{id: student.id}}">detail
                                    <v-icon right small>settings</v-icon>
                                </v-btn>
                            </td>

                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
            <div>
                <div class="text-center">
                    <v-pagination v-model="current_page"
                        :length="last_page" :total-visible="5" circle></v-pagination>
                </div>
            </div>
        </v-container>
    </div>
</template>

<script>
    import axios from 'axios';
    // import store from '../../store'
    // import paginateVue from '../paginateCom.vue';
    import {
        mapGetters,
        mapActions
    } from 'vuex';
    export default {
        components: {
            // paginateVue
        },
        data() {
            return {
                dialog: false,
                current_page: 1,
                total:0,
                last_page:0,
                studentDetail: {},
                teacherStudents: {}
            }
        },
        computed: {
            ...mapGetters({
                // teacherStudents: 'teacher/teacherStudents',
                user: 'auth/user'
            })
        },

        methods: {
            // ...mapActions({
            //     getMyStudents: 'teacher/getMyStudents'
            // }),

            showStudentDetail(student) {
                this.dialog = true;
                this.studentDetail = {
                    ...student
                }
                console.log(student)
            },
            async getMyStudents() {
                await axios.get(`/teacherStudents/${this.user.id}?page=${this.current_page}`).then((res) => {
                    this.teacherStudents = res.data;
                    this.current_page=res.data.students.current_page
                    this.last_page=res.data.students.last_page
                        console.log(res.data.students);
                })
            }
        },
        watch:{
            current_page(newpage){
                this.current_page=newpage
                this.getMyStudents()
            }
        },

        created() {
            this.getMyStudents(this.user.id)
        }

    }
</script>