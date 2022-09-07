// import router from "@/router";
// import {Bus} from '../main'
import axios from "axios"
// import store from ".";

const state={
    Students:{},
    Student:{}
}

const getters={
    students:state=>state.Students,
    student:state=>state.Student
}

const actions={
    async getStudents({commit}){
      return await axios.get('/students?page=1').then((res)=>{
            commit('SET_STUDENTS',res.data)
        })
    },
    async getStudent({commit},id){
        await axios.get(`/students/${id}`).then((res)=>{
            commit('SET_STUDENT',res.data)
        })
    },
    async addStudent(_,data){
       return await axios.post('/students',data).then(()=>{
        })
    },
    async updateStudent({dispatch},data){
        await axios.put(`/students/${data.id}`,data).then(()=>{
            dispatch('getStudent',data.id)
        })
    },

    async DeleteStudent(_,id){
        return axios.delete(`/students/${id}`).then(()=>{
            // dispatch('getStudents')
        })
    }
}

const mutations={
    SET_STUDENTS(state,data){
        state.Students=data
    },
    SET_STUDENT(state,data){
        state.Student=data
    }
}

export default{
    state,getters,actions,mutations,namespaced:true
}