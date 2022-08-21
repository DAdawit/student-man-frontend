<template>
    <div>
        <v-card flat>
            <v-card-title class="text-center justify-start py-6">
                <h1 class="subheading grey--text mb-5"> Students</h1>
            </v-card-title>
        </v-card>
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
        <list-student-vue></list-student-vue>
    </div>
</template>
<script>
    // import addStudentVue from '@/components/Student/addStudent.vue';
    import listStudentVue from '@/components/Student/listStudent.vue'
    export default {

        components: {
            listStudentVue,
            // addStudentVue
        }

    }
</script>