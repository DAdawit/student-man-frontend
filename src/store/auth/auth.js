// const axiosinstance = axios.create({
//     baseURL:  "https://api.yefikrmead.com/"
// });

import router from '../../router/index'
import axios from 'axios'

const state = {
    token: null,
    User: null,
    UsersList:{}

}

const getters = {
    user:state => state.User,
    token:state =>state.token,
    usersList:state=>state.UsersList

}

const actions = {
    async loginUser({
        commit
    }, user) {
        return await axios.post('/login', user).then((res) => {
            commit('SET_TOKEN', res.data.token)
            localStorage.setItem('token', res.data.token)
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
            commit('SET_USER', res.data.user)
        }).catch((err)=>{
            console.log(err);
            localStorage.removeItem('token')
        })
    },

    async logoutUser({commit}){
        return axios.post('/logout').then(()=>{
            localStorage.removeItem('token')
            commit('SET_USER',null)
        })
    },

    async getUsersList({commit}){
      await axios.get('/allUsers').then((res)=>{
          console.log(res.data)
          commit('SET_USERS_LIST',res.data)
      })
  },
    async registerUser({dispatch},data){
        return await axios.post('/register',data).then(()=>{
            dispatch('getUsersList')
        })
    },


    async attempt({
        commit,
        state
    }, token) {
        if (token) {
            commit('SET_TOKEN', token)
        }
        if (!state.token) {
            return
        }
        try {
            let response = await axios.get('/user')
            commit('SET_USER', response.data)
            router.push('app/dashboard')           
        } catch (e) {
            commit('SET_TOKEN', null)
            commit('SET_USER', null)
            localStorage.removeItem('token')
            router.push('/')
        }        
    },


    async ChangePassword(_,data){
       return await axios.patch('/change-password',data)
    },


    async resetPassword(_,data){
        console.log(data)
        return await axios.put('reset-password',data)
    },
    async forgetPassword(_,data){
        return await axios.put('reset-password',data)
    }
}

const mutations = {
    SET_TOKEN(state, data) {
        state.token = data
    },
    SET_USER(state, data) {
        state.User = data
    },
     SET_USERS_LIST(state,data){
        state.UsersList=data
    }
}

export default {
    state,
    getters,
    actions,
    mutations,
    namespaced: true
}