<template>
    <div>
        <template>
            <div class="text-center">
                <v-dialog v-model="dialog" width="500" persistent>
                    <v-card>
                        <v-card-title class="text-h5 grey lighten-2 justify-center">
                            <v-icon left color="white">person</v-icon>
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
                            <th class="text-center" colspan="3">Actions</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(student, index) in students" :key="student.id">
                            <td>{{index+1}}</td>
                            <td>{{ student.fullName}}</td>
                            <td>{{ student.phoneNumber}}</td>
                            <td>{{ student.city}}</td>
                            <td>{{ student.kebele}}</td>
                            <td>{{ student.houseNumber}}</td>
                            <td>{{ student.section.name}}</td>
                            <td>
                                <v-btn small color="info" outlined @click="showStudentDetail(student)">detail
                                    <v-icon right small>visibility</v-icon>
                                </v-btn>
                            </td>
                            <td>
                                <v-btn icon color="orange" @click="edit(student)">
                                    <v-icon small>edit</v-icon>
                                </v-btn>
                            </td>
                            <td>
                                <v-btn icon color="red" @click="deleteStudent(student.id)" :loading="loading">
                                    <v-icon small>delete</v-icon>
                                </v-btn>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-container>
        <alert-message-vue></alert-message-vue>
    </div>
</template>

<script>
import {Bus} from '../../main'
import alertMessageVue from '../alertMessage.vue';
    import {
        mapActions,
        mapGetters
    } from 'vuex'
    export default {
        components:{
            alertMessageVue
        },
        data() {
            return {
                dialog: false,
                studentDetail: {}
            }
        },
        computed: {
            ...mapGetters({
                students: 'student/students'
            })
        },
        methods: {
            ...mapActions({
                getSutdents: 'student/getStudents',
                DeleteStudent: 'student/DeleteStudent'

            }),

            showStudentDetail(student) {
                this.dialog = true;
                this.studentDetail = {
                    ...student
                }
                console.log(student)
            },
            deleteStudent(id){
                this.DeleteStudent(id).then(()=>{
                    Bus.$emit('showalert','student deleted !')
                }).catch((err)=>{
                    console.log(err.response.data)
                })
            }
        },
        created() {
            this.getSutdents();
        }
    }
</script>