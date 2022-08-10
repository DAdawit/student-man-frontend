<template>
  <div>
    <div class="d-flex justify-center">
      <form @submit="signup">
        <!-- <v-row class="d-flex justify-center pt-5">
        </v-row> -->
        <v-row class="d-flex justify-center py-5">
          <v-col cols="10">
            <v-text-field v-model="user.name" label="Full Name" placeholder="Full Name" dense outlined>
            </v-text-field>
            <v-text-field v-model="user.email" label="Email" placeholder="E-mail" dense outlined>
            </v-text-field>
            <v-text-field v-model="user.password" label="password" placeholder="Password" dense outlined
              :type="show1 ? 'text' : 'password'" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show1 = !show1">
            </v-text-field>
            <v-text-field v-model="user.password_confirmation" label="Confirm Password" placeholder="Confirm Password"
              dense outlined :type="show1 ? 'text' : 'password'" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show1 = !show1">
            </v-text-field>
            <router-link to="/forgetPassword" class="d-flex justify-end"><small>forget password?</small></router-link>
          </v-col>

          <small class="red--text" small> {{error}}</small>
          <v-col cols="10">
            <v-btn block class="primary mb-10" type="submit" :loading="loading">login</v-btn>
          </v-col>
        </v-row>
      </form>
    </div>
  </div>
</template>


<script>
import axios from 'axios'
  export default {
    data() {
      return {
        show1: false,
        user: {}
      }
    },
    methods:{
        signup(e){
          e.preventDefault();
          
          axios.post('/register',this.user).then((res)=>{
            console.log(res.data);
          })
        }
}
  }
</script>