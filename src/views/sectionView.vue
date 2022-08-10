<template>
    <div>
        <v-card flat>
            <v-card-title class="text-center justify-start py-6">
                <h1 class="subheading grey--text mb-5"> Sections</h1>
            </v-card-title>
        </v-card>
        <v-container>
            <v-row>
                <v-container>
                    <v-row>
                        <v-col cols="12" class="d-flex justify-end">
                             <add-section-vue></add-section-vue>   
                        </v-col>
                    </v-row>
                </v-container>
                <v-col justify-right>
                </v-col>
            </v-row>
        </v-container>
        <section-list-vue></section-list-vue>
    </div>
</template>

<script>
    import addSectionVue from '@/components/section/addSection.vue';
    import sectionListVue from '@/components/section/sectionList.vue';

    export default {
        components: {
            addSectionVue,
            sectionListVue
        },

    }
</script>