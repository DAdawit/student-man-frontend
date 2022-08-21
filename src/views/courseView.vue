<template>
    <div>
        <v-card flat>
            <v-card-title class="text-center justify-start py-6">
                <h1 class="subheading grey--text mb-5"> Courses</h1>
            </v-card-title>
        </v-card>
        <v-container>
            <v-row>
                <v-container>
                    <v-row>
                        <v-col cols="12" class="d-flex justify-end">
                            <add-course-vue></add-course-vue>
                        </v-col>
                    </v-row>
                </v-container>
               
            </v-row>
        </v-container>
        <br>
        <br>
<course-list-vue></course-list-vue>
    </div>
</template>

<script>
    import addCourseVue from '@/components/course/addCourse.vue';
    import courseListVue from '@/components/course/courseList.vue';

    export default {
        components: {
            addCourseVue,
            courseListVue
        },

    }
</script>