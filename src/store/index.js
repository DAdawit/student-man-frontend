import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth/auth'
import statics from './statics'
import userMan from './auth/userMan'
import courses from './course'
import student from './student'
import section from './section'
import teacher from './teacher'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,statics,userMan,courses,student,section,teacher
  }
})
