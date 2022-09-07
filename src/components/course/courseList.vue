<template>
    <div>
        <v-layout row justify-center>
            <v-dialog v-model="editDialog" max-width="500px">
                <v-card>
                    <v-card-title>
                        <span class="headline">Update Course</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12 sm12 md12>
                                    <v-text-field label="Course titile *" required v-model="editData.name">
                                    </v-text-field>
                                </v-flex>

                                <v-flex xs12 sm12 md12>
                                    <v-textarea label="Course Description" v-model="editData.description"></v-textarea>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" :loading="loading" @click="update">update</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>

        <v-container>
            <v-chip color="primary" class="mb-2">{{courses.current_page}} out of {{courses.last_page}} pages</v-chip>
            <v-simple-table fixed-header class="elevation-1" loading-text="Loading... Please wait">
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left">#ID</th>
                            <th class="text-left">name</th>
                            <th class="text-left">description</th>
                            <th class="text-center" colspan="2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(course, index) in courses.data" :key="course.id">
                            <td>{{index+1}}</td>
                            <td>{{ course.name}}</td>
                            <td><small>{{course.description}}</small>
                            </td>

                            <td>
                                <v-btn icon color="orange" @click="edit(course)">
                                    <v-icon small>edit</v-icon>
                                </v-btn>
                            </td>
                            <td>
                                <v-btn icon color="red" @click="deleteCou(course.id)" :loading="loading">
                                    <v-icon small>delete</v-icon>
                                </v-btn>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-container>
        <div>
            <div class="text-center">
                <v-pagination v-model="current_page" :length="last_page" :total-visible="5" circle></v-pagination>
            </div>
        </div>
        <alert-message></alert-message>
    </div>
</template>

<script>
    import axios from 'axios'
    import {
        Bus
    } from '../../main'
    import alertMessage from '../alertMessage.vue'
    import {
        mapActions,
        mapGetters
    } from 'vuex'
    export default {
        components: {
            alertMessage
        },
        data() {
            return {
                editDialog: false,
                editData: {},
                loading: false,
                current_page: 1,
                total: 0,
                last_page: 0,
                courses: {}
            }
        },
        computed: {
            ...mapGetters({
                // courses: 'courses/courses'
            })
        },
        methods: {
            ...mapActions({
                // getCourses: 'courses/getCourses',
                updatecourse: 'courses/updatecourse',
                deleteCourse: 'courses/deleteCourse'
            }),
            edit(data) {
                this.editDialog = true;
                this.editData = {
                    ...data
                }
            },
            update() {
                this.loading = true;
                const data = {};
                data.id = this.editData.id;
                data.name = this.editData.name;
                this.updatecourse(data).then(() => {
                    // console.log(res.data)
                    this.editDialog = false;
                    this.loading = false;
                    Bus.$emit('showalert', 'Course Updated !')
                }).catch((err) => {
                    this.loading = false
                    // this.editDialog
                    console.log(err.response.data)
                })
            },
            deleteCou(id) {
                this.deleteCourse(id).then(() => {
                    Bus.$emit('showalert', 'course Deleted !')
                }).catch((err) => {
                    console.log(err.response.data)
                })
            },

            async getCourses() {
                await axios.get(`/courses?page=${this.current_page}`).then((res) => {
                    this.courses = res.data
                    this.current_page = res.data.current_page;
                    this.last_page = res.data.last_page;
                })
            },
        },
        watch: {
            current_page(newpage) {
                this.current_page = newpage
                this.getCourses()
            },
        },
        created() {
            Bus.$on('fetchCourse', (() => {
                this.current_page = 1;
                this.getCourses()
            }))
            this.getCourses();
        }
    }
</script>