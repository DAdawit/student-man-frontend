<template>
    <div>
        <v-layout row justify-center>
            <v-dialog v-model="dialog"  max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" v-bind="attrs" v-on="on">
                        Add Section
                        <v-icon right>add</v-icon>
                    </v-btn>
                </template>
                <!-- <v-btn color="primary" dark @click="dialog=true">Open Dialog</v-btn> -->
                <v-card>
                    <v-card-title>
                        <span class="headline">User Profile</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12 sm12 md12>
                                    <v-text-field label="Course titile *" required v-model="course.name">
                                    </v-text-field>
                                </v-flex>

                                <v-flex xs12 sm12 md12>
                                    <v-textarea label="Course Description" v-model="course.description"></v-textarea>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" :loading="loading" @click="save">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>

        <alertMessage></alertMessage>
    </div>
</template>


<script>
    import {
        Bus
    } from '../../main'
    import alertMessage from '../alertMessage.vue'
    import {
        mapActions
    } from 'vuex'
    export default {
        components: {
            alertMessage
        },
        data() {
            return {
                dialog: false,
                course: {},
                loading: false
            }
        },

        methods: {
            ...mapActions({
                addCourse: 'courses/addCourse'
            }),

            save() {
                this.loading = true
                this.addCourse(this.course).then(() => {
                    Bus.$emit('showalert', 'Course added !')
                    this.dialog = false
                    this.loading = false
                    // console.log(res.data)
                    this.course={}
                }).catch((err) => {
                    this.dialog = false;
                    this.loading = false
                    console.log(err.response.data)
                })
            }
        }
    }
</script>