<template>
  <div>
    <div class="d-flex justify-center mt-5">
      <v-card max-width="700">


        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(login)">
            <v-row class="d-flex justify-center py-5">
              <v-col cols="10" class="mt-10">
                <ValidationProvider rules="required" name="Email" v-slot="{ errors }">
                  <v-text-field v-model="user.email" label="Email" placeholder="E-mail" dense outlined
                    :error="errors.length > 0" :error-messages="errors[0]"></v-text-field>
                </ValidationProvider>
                <ValidationProvider rules="required" name="Password" v-slot="{ errors }">
                  <v-text-field v-model="user.password" label="password" placeholder="password" dense outlined
                    :type="show1 ? 'text' : 'password'" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="show1 = !show1" :error="errors.length > 0" :error-messages="errors[0]">
                  </v-text-field>
                </ValidationProvider>
                <!-- <router-link to="/forgetPassword" class="d-flex justify-end"><small>forget password?</small> -->
                <!-- </router-link> -->
              </v-col>

              <small class="red--text" small> {{error}}</small>
              <v-col cols="10">
                <v-btn block class="primary mb-10" type="submit" :loading="loading">login</v-btn>
              </v-col>
            </v-row>
          </form>
        </ValidationObserver>
      </v-card>
    </div>

  </div>
</template>


<script>
  import {
    Bus
  } from '../../main'
  import router from '../../router'
  // import axios from 'axios'
  import {
    mapActions,
    mapGetters
  } from 'vuex';
  export default {
    name: 'LoginPage',
    data() {
      return {
        show1: false,
        loading: false,
        error: '',
        user: {
          email: '',
          password: ''
        }
      }
    },
    computed: {
      ...mapGetters({
        auth: 'auth/user'
      })
    },
    methods: {
      ...mapActions({
        loginUser: 'auth/loginUser'
      }),
      login(e) {
        e.preventDefault();
        this.loginUser(this.user).then((res) => {
          Bus.$emit('closeSignupDialog', false)
          router.push('app/dashboard')
          console.log(res.data)
        }).catch((err) => {
          console.log(err)
        })
      }
    }
  }
</script>