<template>
    <div>
        <router-view></router-view>
        <!-- {{userDetali}} -->

        <!-- {{userStudents}} -->
        <!-- <pre>userStudents</pre> -->
        <v-container>
            <v-row>
                <v-col cols="12" class="d-flex justify-end">
                    <v-card width="30%">
                        <!-- <v-card-title class="d-flex justify-center">user </v-card-title> -->
                        <div class="back">
                            <v-card-text class="d-flex justify-center ">
                                <template>
                                    <v-avatar size="100">
                                        <v-img src="/logo.jpg"
                                            lazy-src="https://image.freepik.com/free-vector/user-icon_126283-435.jpg">
                                        </v-img>
                                    </v-avatar>
                                </template>
                                <br>
                            </v-card-text>
                            <v-divider></v-divider>
                            <v-card-subtitle class="d-flex justify-center">{{userDetali.name}}</v-card-subtitle>
                            <article class="d-flex justify-center">{{userDetali.email}}</article>
                            <article class="d-flex justify-center">{{userDetali.role}}</article>
                        </div>
                    </v-card>
                </v-col>
            </v-row>

            <v-row>
                <v-col class="d-flex justify-start">
                    <div>
                        <v-card max-width="300" tile>
                            <v-list disabled>
                                <v-subheader>REPORTS</v-subheader>
                                <v-list-item-group v-model="selectedItem" color="primary">
                                    <v-list-item v-for="(item, i) in items" :key="i">
                                        <v-list-item-icon>
                                            <v-icon v-text="item.icon"></v-icon>
                                        </v-list-item-icon>
                                        <v-list-item-content>
                                            <v-list-item-title v-text="item.text"></v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list-item-group>
                            </v-list>
                        </v-card>
                    </div>
                </v-col>
            </v-row>

        </v-container>
    </div>
</template>

<script>
    import {
        mapGetters,
        mapActions
    } from 'vuex'
    export default {
        data() {
            return {
                selectedItem: 1,
                items: [{
                        text: 'Real-Time',
                        icon: 'mdi-clock'
                    },
                    {
                        text: 'Audience',
                        icon: 'mdi-account'
                    },
                    {
                        text: 'Conversions',
                        icon: 'mdi-flag'
                    },
                ],
            }
        },
        computed: {
            ...mapGetters({
                userDetali: 'userMan/userDetali',
                userStudents: 'userMan/userStudents'
            })
        },
        methods: {
            ...mapActions({
                getUserDetail: 'userMan/getUserDetail',
                getUserStudents: 'userMan/getUserStudents'
            })
        },
        created() {
            this.getUserDetail(this.$route.params.id)
            this.getUserStudents(this.$route.params.id)
        }
    }
</script>