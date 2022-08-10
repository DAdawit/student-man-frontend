import axios from "axios"

const state={
    Courses:{}
}

const getters={
    courses:state=>state.Courses
}

const actions={
    async getCourses({commit}){
        await axios.get('/courses').then((res)=>{
            commit('SET_COURSES',res.data)
        })
    },

    async addCourse({dispatch},data){
       return await axios.post('/courses',data).then(()=>{
            dispatch('getCourses')
        })
    },
    async updatecourse({dispatch},data){
        return axios.put(`/courses/${data.id}`,data).then(()=>{
            dispatch('getCourses')
        })
    },
    async deleteCourse({dispatch},id){
        return await axios.delete(`/courses/${id}`).then(()=>{
            dispatch('getCourses')
        })
    }
}

const mutations={
    SET_COURSES(state,data){
        state.Courses=data
    }
}

export default {
    state,getters,actions,mutations,namespaced:true
}