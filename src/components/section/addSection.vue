<template>
    <div>
        <v-layout row justify-center>
            <v-dialog v-model="dialog"  max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" v-bind="attrs" v-on="on">
                        Add section
                        <v-icon right>add_home</v-icon>
                    </v-btn>
                </template>
                <!-- <v-btn color="primary" dark @click="dialog=true">Open Dialog</v-btn> -->
                <v-card>
                    <v-card-title>
                        <span class="headline">Add Section</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12 sm12 md12>
                                    <v-text-field label="Section titile *" required v-model="section.name">
                                    </v-text-field>
                                </v-flex>

                                <v-flex xs12 sm12 md12>
                                    <v-textarea label="Section Description" v-model="section.description"></v-textarea>
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
                section: {
                    name:'section 1',
                    description:'section description 1'
                },
                loading: false
            }
        },

        methods: {
            ...mapActions({
                addSection: 'section/addSection'
            }),

            save() {
                this.loading = true
                this.addSection(this.section).then(() => {
                    Bus.$emit('showalert', 'Section added !')
                    this.dialog = false
                    this.loading = false
                    this.section={}
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