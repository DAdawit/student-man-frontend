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
                        <ValidationObserver v-slot="{ handleSubmit }">
                            <form @submit.prevent="handleSubmit(save)">
                                <v-card-title>
                                    <span class="headline">Add Student</span>
                                </v-card-title>
                                <v-card-text>
                                    <v-container grid-list-md>
                                        <v-layout wrap>
                                            <v-flex xs12 sm6 md4>
                                                <ValidationProvider rules="required" name="Full Name"
                                                    v-slot="{ errors }">
                                                    <v-text-field label="Full Name/ ሙሉ ስም" v-model="student.fullName"
                                                        :error="errors.length > 0" :error-messages="errors[0]">
                                                    </v-text-field>
                                                </ValidationProvider>
                                            </v-flex>
                                            <v-flex xs12 sm6 md4>
                                                <ValidationProvider rules="required" name="Christian name"
                                                    v-slot="{ errors }">
                                                    <v-text-field label="Christian name / የክርስትና ስም"
                                                        v-model="student.chName" :error="errors.length > 0"
                                                        :error-messages="errors[0]"></v-text-field>
                                                </ValidationProvider>
                                            </v-flex>
                                            <v-flex xs12 sm6 md4>
                                                <ValidationProvider rules="required" name="Mother Name"
                                                    v-slot="{ errors }">
                                                    <v-text-field label="Mother Name / የእናት ስም"
                                                        v-model="student.motherName" :error="errors.length > 0"
                                                        :error-messages="errors[0]">
                                                    </v-text-field>
                                                </ValidationProvider>
                                            </v-flex>
                                            <v-flex xs12 sm6 md4>
                                                <ValidationProvider rules="required" name="Phone Number"
                                                    v-slot="{ errors }">
                                                    <v-text-field label="Phone Number / ስልክ ቁጥር"
                                                        v-model="student.phoneNumber" :error="errors.length > 0"
                                                        :error-messages="errors[0]">
                                                    </v-text-field>
                                                </ValidationProvider>
                                            </v-flex>
                                            <v-flex xs12 sm6 md4>
                                                <ValidationProvider rules="required" name="Birth date"
                                                    v-slot="{ errors }">
                                                    <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
                                                        :return-value.sync="student.birthDate"
                                                        transition="scale-transition" offset-y min-width="auto">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-text-field v-model="student.birthDate"
                                                                label="Birth date /የተወለደበት(ችበት) ቀን"
                                                                prepend-icon="mdi-calendar" readonly v-bind="attrs"
                                                                v-on="on" :error="errors.length > 0"
                                                                :error-messages="errors[0]">
                                                            </v-text-field>
                                                        </template>
                                                        <v-date-picker v-model="student.birthDate" no-title scrollable>
                                                            <v-spacer></v-spacer>
                                                            <v-btn text color="primary" @click="menu = false"> Cancel
                                                            </v-btn>
                                                            <v-btn text color="primary"
                                                                @click="$refs.menu.save(student.birthDate)">
                                                                OK
                                                            </v-btn>
                                                        </v-date-picker>
                                                    </v-menu>
                                                </ValidationProvider>
                                            </v-flex>

                                            <v-flex xs12 sm6 md4>
                                                <ValidationProvider rules="required" name="Address City"
                                                    v-slot="{ errors }">
                                                    <v-text-field label="Address City / አድራሻ ክ/ከተማ"
                                                        v-model="student.city" :error="errors.length > 0"
                                                        :error-messages="errors[0]">
                                                    </v-text-field>
                                                </ValidationProvider>
                                            </v-flex>
                                            <v-flex xs12 sm6 md4>
                                                <ValidationProvider rules="required" name="Wereda" v-slot="{ errors }">
                                                    <v-text-field label="Wereda / ወረዳ" v-model="student.wereda"
                                                        :error="errors.length > 0" :error-messages="errors[0]">
                                                    </v-text-field>
                                                </ValidationProvider>
                                            </v-flex>
                                            <v-flex xs12 sm6 md4>
                                                <ValidationProvider rules="required" name="Kebele" v-slot="{ errors }">
                                                    <v-text-field label="Kebele / ቀበሌ" v-model="student.kebele"
                                                        :error="errors.length > 0" :error-messages="errors[0]">
                                                    </v-text-field>
                                                </ValidationProvider>
                                            </v-flex>

                                            <v-flex xs12 sm6 md4>
                                                <ValidationProvider rules="required" name="House Number"
                                                    v-slot="{ errors }">
                                                    <v-text-field label="House Number / የቤት ቁጥር"
                                                        v-model="student.houseNumber" :error="errors.length > 0"
                                                        :error-messages="errors[0]"></v-text-field>
                                                </ValidationProvider>
                                            </v-flex>
                                            <v-flex xs12 sm6 md4>
                                                <ValidationProvider rules="required" name="Gender" v-slot="{ errors }">
                                                    <v-select v-model="student.sex" label="Gender / ጾታ"
                                                        :items="['Male', 'Female']" :error="errors.length > 0"
                                                        :error-messages="errors[0]">
                                                    </v-select>
                                                </ValidationProvider>
                                            </v-flex>
                                            <v-flex xs12 sm6 md4>
                                                <ValidationProvider rules="required" name="School Name" v-slot="{ errors }">
                                                    <v-text-field label="School Name / የሚማርበት(የምትማርበት) ት/ቤት"
                                                        v-model="student.schoolName" :error="errors.length > 0"
                                                        :error-messages="errors[0]">
                                                    </v-text-field>
                                                </ValidationProvider>
                                            </v-flex>
                                            <v-flex xs12 sm6 md4>
                                                <ValidationProvider rules="required" name="Grade" v-slot="{ errors }">
                                                    <v-text-field label="Grade / የትምህርት ደረጃ" v-model="student.grade"
                                                        :error="errors.length > 0" :error-messages="errors[0]">
                                                    </v-text-field>
                                                </ValidationProvider>
                                            </v-flex>
                                            <v-flex xs12 sm6 md4>
                                                <ValidationProvider rules="required" name="Course" v-slot="{ errors }">

                                                    <v-select :items="courses.data" v-model="student.course_id"
                                                        item-text="name" item-value="id" label="Course / ኮርስ"
                                                        persistent-hint single-line :error="errors.length > 0"
                                                        :error-messages="errors[0]"></v-select>
                                                </ValidationProvider>
                                            </v-flex>
                                            <v-flex xs12 sm6 md4>
                                                <ValidationProvider rules="required" name="Section" v-slot="{ errors }">

                                                    <v-select :items="sections.data" v-model="student.section_id"
                                                        item-text="name" item-value="id" label="Section / ክፍል "
                                                        persistent-hint single-line :error="errors.length > 0"
                                                        :error-messages="errors[0]"></v-select>
                                                </ValidationProvider>
                                            </v-flex>
                                            <v-flex xs12 sm6 md4 v-if="user.role == 'user'">
                                                <ValidationProvider rules="required" name="Assign Teacher"
                                                    v-slot="{ errors }">
                                                    <v-select :items="usersList.data" v-model="user.id"
                                                        item-text="name" disabled item-value="id"
                                                        label="Assign Teacher / መምህር" persistent-hint single-line
                                                        :error="errors.length > 0" :error-messages="errors[0]">
                                                    </v-select>
                                                </ValidationProvider>
                                            </v-flex>
                                            <v-flex xs12 sm6 md4 v-else>
                                                <ValidationProvider rules="required" name="Assign Teacher"
                                                    v-slot="{ errors }">

                                                    <v-select :items="usersList.data" v-model="student.user_id"
                                                        item-text="name" item-value="id" label="Assign Teacher / መምህር"
                                                        persistent-hint single-line :error="errors.length > 0"
                                                        :error-messages="errors[0]">
                                                    </v-select>
                                                </ValidationProvider>
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                    <small>*indicates required field</small>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn color="blue darken-1" :loading="loading" type="submit">Save</v-btn>
                                </v-card-actions>
                            </form>
                        </ValidationObserver>
                    </v-card>
                </v-layout>
            </v-container>
        </v-container>
        <alert-message-vue></alert-message-vue>
    </div>
</template>

<script>
    import {
        Bus
    } from "../../main";
    // import router from "@/router";
    import alertMessageVue from "../alertMessage.vue";
    import {
        mapGetters,
        mapActions
    } from "vuex";
    export default {
        components: {
            alertMessageVue,
        },
        data() {
            return {
                loading: false,
                menu: false,
                text: '',
                date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                    .toISOString()
                    .substr(0, 10),
                student: {
                    fullName: "",
                    chName: "",
                    motherName: "",
                    phoneNumber: "",
                    birthDate: new Date().toISOString().substr(0, 10),
                    city: "",
                    wereda: "",
                    kebele: "",
                    houseNumber: "",
                    sex: "",
                    schoolName: "",
                    grade: "",
                    user_id: "",
                    course_id: "",
                    section_id: "",
                },
            };
        },
        computed: {
            ...mapGetters({
                sections: "section/sections",
                courses: "courses/courses",
                usersList: "auth/usersList",
                user: "auth/user",
            }),
        },
        methods: {
            ...mapActions({
                getSections: "section/getSections",
                getCourses: "courses/getCourses",
                getUsersList: "auth/getUsersList",
                addStudent: "student/addStudent",
            }),
            save() {
                console.log(this.student);
                this.addStudent(this.student)
                    .then(() => {

                        // if (confirm("Press a button!") == true) {
                        //     this.text = "You pressed OK!";
                        // } else {
                        //     this.text = "You canceled!";
                        // }
                        // Bus.$emit("alert",'student added !')
                        // window.confirm('are u sure you went to add');
                        window.alert('student added')
                        if (this.user.role === 'admin') {
                            this.$router.push("/app/ManageStudent");
                            Bus.$emit('alert', 'student added')
                        } else {
                            this.$router.push("/app/myStudents");
                            Bus.$emit('alert', 'student added')
                        }
                    }).catch((err) => {
                        console.log(err.response.data);
                    });
            },
        },
        created() {
            this.getSections();
            this.getCourses();
            this.getUsersList();
        },
    };
</script>