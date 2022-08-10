<template>
    <div>
        <h1 class="display-3 text-decoration-underline grey--text my-10 d-flex justify-center">How things work</h1>

        <v-container>
            <template>
                <v-timeline :dense="$vuetify.breakpoint.smAndDown">
                    <v-timeline-item color="purple lighten-2" fill-dot right>
                        <v-card>
                            <v-card-title class="purple lighten-2">
                                <v-icon dark size="42" class="mr-4">
                                    add_circle
                                </v-icon>
                                <h2 class="text-h4 white--text font-weight-light">
                                    Add courses
                                </h2>
                            </v-card-title>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" md="10">
                                        Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet
                                        nec ut, sed euismod convenire principes at. Est et nobis iisque percipit.
                                    </v-col>
                                    <v-col class="hidden-sm-and-down text-right" md="2">
                                        <v-icon size="64">
                                            menu_book
                                        </v-icon>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card>
                    </v-timeline-item>

                    <v-timeline-item color="amber lighten-1" fill-dot left small>
                        <v-card>
                            <v-card-title class="amber lighten-1 justify-end">
                                <h2 class="text-h4 mr-4 white--text font-weight-light">
                                    Add Teachers
                                </h2>
                                <v-icon dark size="42">
                                    person
                                </v-icon>
                            </v-card-title>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" md="8">
                                        Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet
                                        nec ut, sed euismod convenire principes at. Est et nobis iisque percipit.
                                    </v-col>

                                    <v-col class="hidden-sm-and-down text-right" md="2">
                                        <v-icon size="64">
                                            supervised_user_circle
                                        </v-icon>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card>
                    </v-timeline-item>

                    <v-timeline-item color="cyan lighten-1" fill-dot right>
                        <v-card>
                            <v-card-title class="cyan lighten-1">
                                <v-icon class="mr-4" dark size="42">
                                    groups
                                </v-icon>
                                <h2 class="text-h4 white--text font-weight-light">
                                    Add Students
                                </h2>
                            </v-card-title>
                            <v-container>
                                <v-row>
                                    <v-col v-for="n in 3" :key="n" cols="12" md="4">
                                        Lorem ipsum dolor sit amet, no nam oblique veritus no nam oblique.
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card>
                    </v-timeline-item>

                    <v-timeline-item color="red lighten-1" fill-dot left small>
                        <v-card>
                            <v-card-title class="red lighten-1 justify-end">
                                <h2 class="text-h4 mr-4 white--text font-weight-light">
                                    User settings
                                </h2>

                                <v-icon dark size="42">
                                    manage_accounts
                                </v-icon>
                            </v-card-title>
                            <v-container>
                                <v-row>
                                    <v-col class="hidden-sm-and-down" md="2">

                                        <v-icon size="64">
                                            settings_suggest
                                        </v-icon>
                                    </v-col>
                                    <v-col cols="12" md="10">
                                        Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet
                                        nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim
                                        zril disputando voluptatibus.
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card>
                    </v-timeline-item>

                    <v-timeline-item color="green lighten-1" fill-dot right>
                        <v-card>
                            <v-card-title class="green lighten-1">
                                <v-icon class="mr-4" dark size="42">
                                    search
                                </v-icon>
                                <h2 class="text-h4 white--text font-weight-light">
                                    search
                                </h2>
                            </v-card-title>
                            <v-container>
                                <v-row>
                                    <v-col>
                                        Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet
                                        nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim
                                        zril disputando voluptatibus, vix an salutandi sententiae.
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card>
                    </v-timeline-item>
                </v-timeline>
            </template>
        </v-container>
        <v-card flat>

        </v-card>
    </div>
</template>

<script>
    export default {

    }
</script>