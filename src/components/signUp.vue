<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="white" outlined depressed v-bind="attrs" v-on="on">
          signin
          <v-icon small right>login</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-tabs grow centered>
          <v-tab>SignIn</v-tab>
          <!-- <v-tab>signup</v-tab> -->
          <v-tab-item>
            <SignupLogin />
          </v-tab-item>
          <!-- <v-tab-item>
            <SignupRegister />
          </v-tab-item> -->
        </v-tabs>


      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import {
    Bus
  } from '../main'
  // import SignupRegister from './Signup/SignupRegister.vue'
  import SignupLogin from './Signup/SignupLogin.vue';
  export default {
    components: {
      // SignupRegister,
      SignupLogin
    },
    data() {
      return {
        dialog: false
      };
    },
    created() {
      Bus.$on("closeSignupDialog", ((data) => {
          this.dialog = data
        }))
    }
  }
</script>