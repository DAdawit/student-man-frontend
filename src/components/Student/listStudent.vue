<template>
    <div>
        List students
        {{students}}

        <v-container>
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
                    <!-- {{registrationFees.results[0].id}} -->
                    <tbody>
                        <tr v-for="(course, index) in courses.courses" :key="course.id">
                            <td>{{index+1}}</td>
                            <td>{{ course.name}}</td>
                            <td><small>Lorem Ipsum is simply dummy text of the printing and typesetting
                                    industry.</small>
                            </td>

                            <td>
                                <v-btn  icon color="orange" @click="edit(course)">
                                    <v-icon small>edit</v-icon>
                                </v-btn>
                            </td>
                            <td>
                                <v-btn  icon color="red" @click="deleteCou(course.id)" :loading="loading">
                                    <v-icon small>delete</v-icon>
                                </v-btn>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-container>
    </div>
</template>

<script>
import { mapActions,mapGetters } from 'vuex'
export default {
    
    data(){
        return{

        }
    },
    computed:{
        ...mapGetters({
            students:'student/students'
        })
    },
    methods:{
        ...mapActions({
            getSutdents: 'student/getStudents'
        })
    },
    created(){
        this.getSutdents();
    }
}
</script>