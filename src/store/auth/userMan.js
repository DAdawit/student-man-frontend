import axios from "axios";

const state={
    UserDetali:{},
    UserStudents:{}

}

const getters={
userDetali:state=>state.UserDetali,
userStudents:state=>state.UserStudents
}

const actions={
    async getUserDetail({commit},id){
        await axios.get(`/getUser/${id}`).then((res)=>{
            // console.log(res.data)
            commit('SET_USER_DETAIL',res.data)
        })
    },

    async updateUser({dispatch},data){
       return await axios.patch(`/editUser/${data.id}`,data).then(()=>{
        dispatch('getUserDetail',data.id)
       })
    },

    async getUserStudents({commit},id){
        await axios.get(`/teacherStudents/${id}`).then((res)=>{

            commit('SET_USER_STUDENTS',res)
        })
    }
}

const mutations={
    SET_USER_DETAIL(state,data){
        state.UserDetali=data
    },
    SET_USER_STUDENTS(state,data){
        state.UserStudents=data
    }

}


export default {
    state,
    getters,
    actions,
    mutations,
    namespaced: true
}