<template>
    <div>
        <v-layout row justify-center>
            <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" v-bind="attrs" v-on="on">
                        Add section
                        <v-icon right>add_home</v-icon>
                    </v-btn>
                </template>
                <!-- <v-btn color="primary" dark @click="dialog=true">Open Dialog</v-btn> -->
                <v-card>
                    <ValidationObserver v-slot="{ handleSubmit }">
                        <form @submit.prevent="handleSubmit(save)">
                            <v-card-title>
                                <span class="headline">Add Section</span>
                            </v-card-title>
                            <v-card-text>
                                <v-container grid-list-md>
                                    <v-layout wrap>
                                        <v-flex xs12 sm12 md12>
                                            <ValidationProvider rules="required" name="Title" v-slot="{ errors }">
                                                <v-text-field label="Section titile *"  v-model="section.name"
                                                    :error="errors.length > 0" :error-messages="errors[0]">
                                                </v-text-field>
                                            </ValidationProvider>
                                        </v-flex>

                                        <v-flex xs12 sm12 md12>
                                            <ValidationProvider rules="required" name="Description" v-slot="{ errors }">
                                                <v-textarea label="Section Description *" v-model="section.description"
                                                    :error="errors.length > 0" :error-messages="errors[0]">
                                                </v-textarea>
                                            </ValidationProvider>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                                <small>*indicates required field</small>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" :loading="loading" type="submit">Save</v-btn>
                            </v-card-actions>
                        </form>
                    </ValidationObserver>
                </v-card>
            </v-dialog>
        </v-layout>

        <alertMessage></alertMessage>
    </div>
</template>


<script>
import axios from 'axios'
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
                section: {
                    name: '',
                    description: ''
                },
                loading: false
            }
        },

        methods: {
            ...mapActions({
                addSection: 'section/addSection'
            }),
            async getSections() {
                await axios.get(`/sections?page=${this.current_page}`).then((res) => {
                    this.sections = res.data;
                    this.current_page = res.data.current_page;
                    this.last_page = res.data.last_page;
                })
            },

            save() {
                this.loading = true
                this.addSection(this.section).then(() => {
                    Bus.$emit('showalert', 'Section added !')
                    Bus.$emit('fetchSection')

                   this.getSections()

                    this.dialog = false
                    this.loading = false
                    this.section = {}
                    this.course = {}
                }).catch((err) => {
                    this.dialog = false;
                    this.loading = false
                    console.log(err.response.data)
                })
            }
        }
    }
</script>