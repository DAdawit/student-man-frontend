<template>
    <div>
        <v-card flat>
            <v-card-title class="text-center justify-start py-6">
                <h1 class="subheading grey--text mb-5 ">Teacher Dashboard</h1>
            </v-card-title>
        </v-card>
        <v-row class="px-2">
            <v-col cols="12" lg="4" md="6" sm="12">
                <template>
                    <v-card class="mt-4 mx-auto" max-width="400">
                        <v-sheet class="v-sheet--offset mx-auto" color="teal" elevation="12"
                            max-width="calc(100% - 32px)">
                            <v-sparkline :labels="labels" :value="value" color="white" line-width="2" padding="16">
                            </v-sparkline>
                        </v-sheet>

                        <v-card-text class="pt-0">
                            <div class="text-h6 font-weight-light mb-2">Number of Students</div>
                            <div class="subheading font-weight-light grey--text">
                                <!-- Total number of Students {{numStudents}} -->
                            </div>
                            <v-divider class="my-2"></v-divider>
                            <v-icon class="mr-2" small> mdi-clock </v-icon>
                            <span class="text-caption grey--text font-weight-light">last registration 26 minutes
                                ago</span>
                        </v-card-text>
                    </v-card>
                </template>
            </v-col>
            <v-col cols="12" lg="4" md="6" sm="12">
                <template>
                    <v-card class="mt-4 mx-auto" max-width="400">
                        <v-sheet class="v-sheet--offset mx-auto" color="light-green" elevation="12"
                            max-width="calc(100% - 32px)">
                            <v-sparkline :labels="labels" :value="value" color="white" line-width="2" padding="16">
                            </v-sparkline>
                        </v-sheet>

                        <v-card-text class="pt-0">
                            <div class="text-h6 font-weight-light mb-2">Number of Teachers </div>
                            <div class="subheading font-weight-light grey--text">
                                <!-- Total number of Teachers {{numUsers}} -->
                            </div>
                            <v-divider class="my-2"></v-divider>
                            <v-icon class="mr-2" small> mdi-clock </v-icon>
                            <span class="text-caption grey--text font-weight-light">last registration 26 minutes
                                ago</span>
                        </v-card-text>
                    </v-card>
                </template>
            </v-col>
        </v-row>
    </div>
</template>
